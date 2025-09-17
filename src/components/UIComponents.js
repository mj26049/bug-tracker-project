import React from 'react';

const statusColors = {
  open: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  resolved: 'bg-green-100 text-green-800',
  completed: 'bg-purple-100 text-purple-800',
  closed: 'bg-gray-100 text-gray-800'
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export const Badge = ({ type, value }) => {
  const colorClass = type === 'status' ? statusColors[value.toLowerCase()] : priorityColors[value.toLowerCase()];
  
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${colorClass}`}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
};

export const Card = ({ title, value, icon, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>
        </div>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="absolute left-3 top-2.5 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};