import React, { createContext, useState, useContext, useEffect } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5555/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  const contextData = {
    jobs, 
    fetchJobs, 
    error
  }
  return (
        // Provide the jobs, fetchJobs function, and error state to the context consumers
    <JobContext.Provider value={{contextData}}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  return useContext(JobContext);
};