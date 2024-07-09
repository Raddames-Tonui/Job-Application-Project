// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '/home/rehema/Job-Application-Project/frontend/src/assets/—Pngtree—recruitment concept of job search_5268231.png';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-8" />
        </Link>
        
        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
          <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
          <li><Link to="/register-company" className="hover:text-gray-300">Register Company</Link></li>
          <li><Link to="/search-jobs" className="hover:text-gray-300">Search Jobs</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

