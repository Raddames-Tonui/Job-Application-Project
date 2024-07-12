import React from 'react';
import { useJobContext } from './context/JobContext';

const Home = () => {
  const { jobs, fetchJobs, error } = useJobContext();

  return (
    <div className="home-container">
      <h1>Job Listings</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
          </li>
        ))}
      </ul>
      <button onClick={fetchJobs}>Refresh Jobs</button>
    </div>
  );
};

export default Home;
