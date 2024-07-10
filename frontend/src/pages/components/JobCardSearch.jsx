import React from 'react';
import { Link } from 'react-router-dom';

function JobCardSearch({ job }) {
  return (
    <li className="bg-white bg-opacity-0 shadow rounded-lg p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src={job.icon} alt="" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
        <h5 className="text-md text-gray-900">{job.company.name}</h5>
        <p className="text-sm text-gray-500">{job.description}</p>
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
         Apply
        </Link>
      
      </div>
      
    </li>
  );
}

export default JobCardSearch;
