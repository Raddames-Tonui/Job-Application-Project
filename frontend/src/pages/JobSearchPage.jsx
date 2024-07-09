import React from 'react';

const JobSearchPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Find Your Dream Job Here</h1>
        
        {/* Search Bar */}
        <div className="mb-6 flex items-center">
          <input
            type="text"
            placeholder="Search by company name or job title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Search
          </button>
        </div>
        
        {/* Filters Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Filters</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remote"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="remote" className="ml-2 text-gray-700">Remote</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="full-time"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="full-time" className="ml-2 text-gray-700">Full Time</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="contract"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor="contract" className="ml-2 text-gray-700">Contract</label>
          </div>
        </div>
        
        {/* Job Listings */}
        <div>
          <h2 className="text-xl font-bold mb-2">Job Listings</h2>
          <div className="border-t border-gray-200 mt-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <h3 className="text-lg font-bold">Frontend Developer</h3>
                <p className="text-gray-600">Company Name - Location</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                Apply
              </button>
            </div>
            {/* where i can Add more job listings*/}
          </div>
        </div>
        
        {/* Additional Content */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">Additional content related to job search can be added here.</p>
        </div>
        
      </div>
    </div>
  );
};

export default JobSearchPage;
