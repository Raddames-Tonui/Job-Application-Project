import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import RegisterCompanyPage from './pages/RegisterCompanyPage.jsx';
import JobSearchPage from './pages/JobSearchPage.jsx';
import Navbar from './components/Navbar.jsx';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-company" element={<RegisterCompanyPage />} />
          <Route path="/search-jobs" element={<JobSearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
