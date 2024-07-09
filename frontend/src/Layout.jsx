import React from 'react';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';


function Layout() {
  return (
    <div>
      <Navbar />
      <ToastContainer />

      <Outlet/>
    </div>
  );
}

export default Layout;