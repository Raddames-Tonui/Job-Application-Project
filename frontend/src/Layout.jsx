import React, { useContext, useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

import Navbar from './components/Navbar';
import { UserContext } from './context/UserContext';

function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout, authToken } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <Navbar 
        currentUser={currentUser}
        handleLogout={handleLogout}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        authToken={authToken}
      />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default Layout;