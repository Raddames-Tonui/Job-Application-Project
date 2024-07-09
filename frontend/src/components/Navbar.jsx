import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/jobsearch.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-8" />
        </Link>
        
        {/* Hamburger Menu */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
        
        {/* Navigation Links */}
        <ul className={`lg:flex space-x-4 ${isOpen ? "block" : "hidden"}`}>
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
