import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { AppDispatch } from '../store/store';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch for dispatch

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-800 text-white w-64">
      <nav className="flex flex-col p-4 space-y-4">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? 'bg-blue-700 p-3 rounded' : 'hover:bg-gray-700 p-3 rounded'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'bg-blue-700 p-3 rounded' : 'hover:bg-gray-700 p-3 rounded'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? 'bg-blue-700 p-3 rounded' : 'hover:bg-gray-700 p-3 rounded'
          }
        >
          Product Listing
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? 'bg-blue-700 p-3 rounded' : 'hover:bg-gray-700 p-3 rounded'
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? 'bg-blue-700 p-3 rounded' : 'hover:bg-gray-700 p-3 rounded'
          }
        >
          Settings
        </NavLink>
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full text-left bg-red-600 p-3 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
