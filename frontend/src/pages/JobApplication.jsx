// JobApplication.jsx

import React, { useState } from 'react';

const JobApplication = ({ job, onDelete }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(''); //  'pending', 'accepted', 'rejected'

  const handleApply = () => {
    //Send application request to backend
    setIsApplying(true);
    setTimeout(() => {
      // Simulate application process
      setApplicationStatus('pending'); 
    }, 1000); // Simulate loading time
  };

  const handleDelete = () => {
    // delete request 
    onDelete(job.id);
  };

  return (
    <div className="border rounded-lg shadow-lg p-4 mb-4">
      <h3 className="text-xl font-bold">{job.title}</h3>
      <p className="text-gray-600">{job.company} - {job.location}</p>
      <p className="mt-2">{job.description}</p>
      
      {/* Apply Button */}
      {applicationStatus === 'pending' ? (
        <p className="text-yellow-500 mt-2">Application status: Pending</p>
      ) : (
        <button
          onClick={handleApply}
          className={`mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${isApplying && 'opacity-50 cursor-not-allowed'}`}
          disabled={isApplying}
        >
          {isApplying ? 'Applying...' : 'Apply'}
        </button>
      )}

      {/* Delete Application Button */}
      {applicationStatus === 'pending' && (
        <button
          onClick={handleDelete}
          className="mt-2 ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Delete Application
        </button>
      )}
    </div>
  );
};

export default JobApplication;
