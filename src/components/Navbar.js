import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Bug Tracker</span>
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/dashboard" className="inline-flex items-center px-1 pt-1 text-gray-900">
                  Dashboard
                </a>
                <a href="/bugs" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                  Bugs
                </a>
              </div>
            )}
          </div>
          {user && (
            <div className="flex items-center">
              <button
                onClick={() => navigate('/profile')}
                className="mr-4 text-gray-500 hover:text-gray-900"
              >
                {user.name}
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};