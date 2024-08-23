// src/components/Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyApp</div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          <a href="/login" className="text-white hover:text-gray-200">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
