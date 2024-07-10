// UserDashboard.jsx

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SearchJobsPage from './SearchJobsPage';
import ApplyJobsPage from './ApplyJobsPage'; 

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Switch>
        <Route path="/search-jobs" component={SearchJobsPage} />
        <Route path="/apply-jobs" component={ApplyJobsPage} />
      </Switch>
    </div>
  );
};

export default UserDashboard;
