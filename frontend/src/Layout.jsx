import React from 'react';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify'

import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className='space-y-16'>
      <Navbar />
      <ToastContainer />

      <Outlet/>
    </div>
  );
}

export default Layout;