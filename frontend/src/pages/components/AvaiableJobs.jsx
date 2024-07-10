import React from 'react';
import { useJobContext } from '../context/JobContext';

const AvailableJobs = () => {
  const { jobs } = useJobContext();

  return (
    <div className="mt-10">
      <h2 className="text-center text-2xl font-bold text-gray-900">Available Jobs</h2>
      <div className="mt-6">
        {jobs.length > 0 ? (
          <ul className="space-y-4">
            {jobs.map(job => (
              <li key={job.id} className="bg-white p-4 rounded shadow-md">
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-700">{job.description}</p>
                <p className="text-gray-500">{job.requirements}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableJobs;
