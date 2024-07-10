import React from "react";
import Navbar from "../pages/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen overflow-y-scroll no-scrollbar">
      <Navbar />
      <ToastContainer />

      <Outlet />
    </div>
  );
}

export default Layout;
