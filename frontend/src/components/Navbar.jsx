import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/jobsearch.png';

function Navbar({ currentUser, handleLogout, isOpen, setIsOpen, authToken }) {
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className='flex items-center' onClick={closeMenu}>
              <img className="h-16 w-auto" src={Logo} alt="Logo" />
              <h2 className='font-bold'>JOB SEARCH</h2>
            </Link>
          </div>

          <div className="hidden md:flex flex-grow justify-end items-center space-x-4">
            {authToken ? (
              <>
                {currentUser && currentUser.is_admin ? (
                  <>
                    <Link to="/admin" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin</Link>
                    <Link to="/user" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">User Dashboard</Link>
                  </>
                ) : (
                  <Link to="/search-jobs" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Search Jobs</Link>
                )}
                <button onClick={handleLogout} className="text-white bg-blue-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-2xl text-base font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Home</Link>
                <Link to="/signup" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={closeMenu}>Register</Link>
                <Link to="/login" className="text-white bg-blue-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-2xl text-base font-medium" onClick={closeMenu}>Login</Link>
              </>
            )}
          </div>

          <div className="-mr-2 flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white" onClick={closeMenu}>Home</Link>
          {authToken && currentUser && currentUser.is_admin && (
            <>
              <Link to="/admin" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white" onClick={closeMenu}>Admin</Link>
              <Link to="/user" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white" onClick={closeMenu}>User Dashboard</Link>
            </>
          )}
          {authToken && (
            <button onClick={() => { handleLogout(); closeMenu(); }} className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white">
              Logout
            </button>
          )}
          {!authToken && (
            <>
              <Link to="/signup" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white" onClick={closeMenu}>Register</Link>
              <Link to="/login" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white" onClick={closeMenu}>Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
