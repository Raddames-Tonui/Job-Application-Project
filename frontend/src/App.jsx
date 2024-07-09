
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from '/home/rehema/Job-Application-Project/frontend/src/components/Landingpage.jsx';
import LoginPage from '/home/rehema/Job-Application-Project/frontend/src/components/loginPage.jsx';
import RegisterCompanyPage from '/home/rehema/Job-Application-Project/frontend/src/components/Registercompanies.jsx';
import JobSearchPage from '/home/rehema/Job-Application-Project/frontend/src/components/jobsearch.jsx';
import Navbar from '/home/rehema/Job-Application-Project/frontend/src/components/Navbar.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register-company" component={RegisterCompanyPage} />
          <Route path="/search-jobs" component={JobSearchPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
