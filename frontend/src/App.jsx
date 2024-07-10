import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout.jsx";
import NoPage from "./pages/NoPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterCompanyPage from "./pages/RegisterCompanyPage.jsx";
import Fetch from "./pages/components/Fetch.jsx";

import { UserProvider } from "./pages/context/UserContext.jsx";
import { JobProvider } from "./pages/context/JobContext.jsx";
import { CompanyProvider } from "./pages/context/CompanyContext.jsx";
import { ApplicationProvider } from "./pages/context/ApplicationContext.jsx";

import SignUpForm from "./pages/SignUpForm.jsx";

function App() {
  return (
    <Router>
      <UserProvider>
        <JobProvider>
          <CompanyProvider>
            <ApplicationProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="/fetch" element={<Fetch />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpForm />} />
                  <Route path="/register-company"  element={<RegisterCompanyPage />}/>
                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </ApplicationProvider>
          </CompanyProvider>
        </JobProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
