import React, { createContext, useState, useContext } from 'react';
import {server_url} from "../../config.json";

const JobContext = createContext();

export const useJobContext = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const response = await fetch(`${server_url}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    const data = await response.json();
    setJobs(data);
  };

  const createJob = async (jobData) => {
    const response = await fetch(`${server_url}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    });
    if (!response.ok) {
      throw new Error('Failed to create job');
    }
    const data = await response.json();
    setJobs([...jobs, data]);
    // Optionally add success notification
  };

  const updateJob = async (id, updatedJob) => {
    const response = await fetch(`${server_url}/jobs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
    setJobs(jobs.map(job => job.id === id ? updatedJob : job));
  };

  const deleteJob = async (id) => {
    const response = await fetch(`${server_url}/jobs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, fetchJobs, createJob, updateJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};
