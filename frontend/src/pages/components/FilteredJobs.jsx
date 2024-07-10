import React from 'react';
import JobCard from '../components/JobCard';

const FilteredJobs = ({ filteredJobs }) => {

  // Slice the array to display only the first 5 jobs
  const limitedJobs = filteredJobs.slice(0, 5);

  return (
    <div className="mt-10 bg-gray-200 bg-opacity-90 p-4 rounded-lg">
      <div className="flex flex-wrap justify-center gap-4">
        <li>
          {limitedJobs.length > 0 ? (
            limitedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <p className="col-span-full text-center md:w-[60vw] text-gray-700">
              No jobs available.
            </p>
          )}
        </li>
        
      </div>
    </div>
  );
};

export default FilteredJobs;
