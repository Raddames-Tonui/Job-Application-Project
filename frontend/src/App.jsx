import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";
import { JobProvider } from "./context/JobContext.jsx";

import Layout from "./layout/Layout.jsx";
import NoPage from "./pages/NoPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

import ApplyJob from "./components/ApplyJob.jsx";

function App() {
  return (
    <Router>
      <UserProvider>
        <JobProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobs/apply/:id" element={<ApplyJob />} />
              <Route path="/admin" element={<AdminDashboard />} />
          
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </JobProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
