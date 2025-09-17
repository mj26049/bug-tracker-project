import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput, Badge } from '../components/UIComponents';
import { useBugs } from '../hooks/useBugs';
import { bugPriorities, bugStatuses } from '../data/sampleData';

export const BugsList = () => {
  const navigate = useNavigate();
  const { bugs, updateBug } = useBugs();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [hideCompleted, setHideCompleted] = useState(false);

  const filteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      const matchesSearch = 
        bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bug.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || bug.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || bug.priority === priorityFilter;
      const matchesCompletion = !hideCompleted || bug.status !== 'completed';

      return matchesSearch && matchesStatus && matchesPriority && matchesCompletion;
    });
  }, [bugs, searchQuery, statusFilter, priorityFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bugs</h1>
        <button
          onClick={() => navigate('/bugs/new')}
          className="btn btn-primary flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Bug
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bugs..."
          />
          <div className="flex items-center space-x-4">
            <select
              className="input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              {bugStatuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-purple-600"
                checked={hideCompleted}
                onChange={(e) => setHideCompleted(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">Hide Completed</span>
            </label>
          </div>
          <select
            className="input"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            {bugPriorities.map(priority => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Bugs Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBugs.map(bug => (
                <tr
                  key={bug.id}
                  onClick={() => navigate(`/bugs/${bug.id}`)}
                  className={`cursor-pointer transition duration-150 hover:bg-gray-50 ${
                    bug.status === 'completed' ? 'bg-purple-50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newStatus = bug.status === 'completed' ? 'open' : 'completed';
                          updateBug(bug.id, { status: newStatus });
                        }}
                        className="mr-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-150"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 ${
                            bug.status === 'completed' 
                              ? 'text-purple-600' 
                              : 'text-gray-300 hover:text-purple-600'
                          }`}
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                      </button>
                      <div 
                        onClick={() => navigate(`/bugs/${bug.id}`)}
                        className={`text-sm font-medium cursor-pointer ${
                        bug.status === 'completed' ? 'text-gray-600' : 'text-gray-900'
                      }`}>
                        {bug.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge type="priority" value={bug.priority} />
                  </td>
                  <td className="px-6 py-4">
                    <Badge type="status" value={bug.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{bug.assignedTo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {new Date(bug.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBugs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No bugs found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};