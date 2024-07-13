import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; 
import { JobProvider } from './context/JobContext';    

import Layout from './Layout.jsx';

import NoPage from './pages/NoPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import JobSearchPage from './pages/JobSearchPage.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

import ApplyJob from './components/ApplyJob.jsx';

import JobApplication from './components/JobApplication.jsx';

function App() {
  return (
    <Router>
      <UserProvider> 
        <JobProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search-jobs" element={<JobSearchPage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path='/user' element={<Dashboard/>}/>
              <Route path="/jobs" element={<JobApplication />} />
              <Route path="/jobs/apply/:id" element={<ApplyJob />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </JobProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
