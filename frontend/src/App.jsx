import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';

import Layout from './Layout.jsx';

import NoPage from './pages/NoPage.jsx';
import LandingPage from './pages/LandingPage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import RegisterCompanyPage from './pages/RegisterCompanyPage.jsx';
import JobSearchPage from './pages/JobSearchPage.jsx';

// import { UserContext } from './context/UserContext.jsx';
// import CompanyContext from './context/CompanyContext.jsx';


function App() {
  return (
    <Router>
      {/* <UserContext>
        <CompanyContext>
          <JobContext>
              <ApplicationContext> */}

                <Routes>
                    <Route path='/' element={<Layout/>}>                    
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register-company" element={<RegisterCompanyPage />} />
                      <Route path="/search-jobs" element={<JobSearchPage />} />

                      <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>

            {/* </ApplicationContext>
          </JobContext>
        </CompanyContext>
      </UserContext> */}
    </Router>
  );
}

export default App;
