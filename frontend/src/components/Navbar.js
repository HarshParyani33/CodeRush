import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user } = useAuth();

  // Get the first letter of username for the profile button
  const getInitial = (username) => {
    return username ? username.charAt(0).toUpperCase() : 'U';
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-3">
              <img
                src="/assets/images/logo.png"
                alt="Code Rush Logo"
                className="h-8 w-8"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-white text-lg font-bold">Code Rush</span>
            </Link>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 text-sm">{user?.username}</span>
                <Link
                  to="/profile"
                  className="group relative inline-flex items-center justify-center h-8 w-8"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 opacity-75 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex items-center justify-center h-7 w-7 rounded-full bg-gray-900 text-white text-sm font-medium">
                    {getInitial(user?.username)}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-300 transition-colors duration-200 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 