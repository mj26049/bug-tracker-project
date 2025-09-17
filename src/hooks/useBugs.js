import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const STORAGE_KEY = 'bugTrackerBugs';

export const useBugs = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load bugs from localStorage or initialize with sample data
    const savedBugs = localStorage.getItem(STORAGE_KEY);
    if (savedBugs) {
      setBugs(JSON.parse(savedBugs));
    } else {
      // Import sample data only when needed
      import('../data/sampleData').then(({ sampleBugs }) => {
        setBugs(sampleBugs);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBugs));
      });
    }
    setLoading(false);
  }, []);

  // Save bugs to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bugs));
    }
  }, [bugs, loading]);

  const addBug = (bugData) => {
    const newBug = {
      id: uuidv4(),
      ...bugData,
      status: bugData.status || 'open',
      createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      createdBy: user.id,
      updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
    setBugs(currentBugs => [...currentBugs, newBug]);
    return newBug;
  };

  const updateBug = (id, updates) => {
    setBugs(currentBugs => 
      currentBugs.map(bug => 
        bug.id === id 
          ? { 
              ...bug, 
              ...updates, 
              updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') 
            } 
          : bug
      )
    );
  };

  const deleteBug = (id) => {
    setBugs(currentBugs => currentBugs.filter(bug => bug.id !== id));
  };

  const getBug = (id) => {
    return bugs.find(bug => bug.id === id);
  };

  const getUserBugs = (userId) => {
    return bugs.filter(bug => bug.createdBy === userId);
  };

  const getBugsByStatus = (status) => {
    return bugs.filter(bug => bug.status === status);
  };

  return {
    bugs,
    loading,
    addBug,
    updateBug,
    deleteBug,
    getBug,
    getUserBugs,
    getBugsByStatus,
  };
};