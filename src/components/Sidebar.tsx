import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { AppDispatch } from '../store/store';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Typed dispatch with AppDispatch

  // Handle user logout action
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-800 text-white w-64">
      {/* Navigation Links */}
      <nav className="flex flex-col p-4 space-y-4">
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? 'bg-blue-700 p-3 rounded' : 'hover:bg-gray-700 p-3 rounded'
          }
        >
          Product Listing
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          id="logout-button"
          className="w-full text-left bg-red-600 p-3 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
