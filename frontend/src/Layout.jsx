import React, { useContext, useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

import Navbar from './components/Navbar';

function Layout() {
 
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <Navbar />

      <ToastContainer className={"absolute top-16  right-0"} />

      <Outlet />
    </div>
  );
}

export default Layout;