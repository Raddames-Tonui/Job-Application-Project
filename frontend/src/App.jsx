import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; 
import { JobProvider } from './context/JobContext';    

import Layout from './Layout.jsx';

import NoPage from './pages/NoPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpForm from './pages/SignUpForm.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

import JobApplication from './components/JobApplication.jsx';


function App() {
  return (
    <Router>
      <UserProvider> 
        <JobProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/home" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path='/user' element={<Dashboard/>}/>
              <Route path="/jobs/apply/:id" element={<JobApplication />} />

              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </JobProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
