import React from 'react';

export const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transform rotate-12 shadow-lg">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <div className="ml-3">
        <h1 className="text-2xl font-bold text-gray-900">BugTracker</h1>
        <p className="text-sm text-gray-600">Track, manage, resolve</p>
      </div>
    </div>
  );
};