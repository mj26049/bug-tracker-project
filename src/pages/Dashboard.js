import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/UIComponents';
import { useBugs } from '../hooks/useBugs';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { bugs } = useBugs();

  const stats = {
    total: bugs.length,
    open: bugs.filter(bug => bug.status === 'open').length,
    inProgress: bugs.filter(bug => bug.status === 'in-progress').length,
    resolved: bugs.filter(bug => bug.status === 'resolved').length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Bugs"
          value={stats.total}
          className="border-l-4 border-blue-500"
        />
        <Card
          title="Open Bugs"
          value={stats.open}
          className="border-l-4 border-yellow-500"
        />
        <Card
          title="In Progress"
          value={stats.inProgress}
          className="border-l-4 border-purple-500"
        />
        <Card
          title="Resolved"
          value={stats.resolved}
          className="border-l-4 border-green-500"
        />
      </div>

      {/* Recent Activity section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="bg-white shadow-lg rounded-2xl p-6">
          {bugs.slice(0, 5).map(bug => (
            <div
              key={bug.id}
              onClick={() => navigate(`/bugs/${bug.id}`)}
              className="flex items-center justify-between py-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50"
            >
              <div>
                <h3 className="font-medium text-gray-900">{bug.title}</h3>
                <p className="text-sm text-gray-500">Created on {new Date(bug.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  bug.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                  bug.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {bug.status}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};