import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";

import Layout from "./layout/Layout.jsx";
import NoPage from "./pages/NoPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterCompanyPage from "./pages/RegisterCompanyPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import SignUpForm from "./pages/SignUpForm.jsx";
import CompanyManagement from "./pages/CompanyManagement.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import ApplyJob from "./components/ApplyJob.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";



function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/register-company" element={<RegisterCompanyPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="jobs/apply/:id" element={<ApplyJob />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard/>}/>
            <Route path="/companymanagement" element={<CompanyManagement />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </UserProvider>

    </Router>
  );
}

export default App;
