
// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/cover_photo.jpg";


const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5555/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApply = (jobId) => {
    navigate(`jobs/apply/${jobId}`);
  };

  return (
    <div>
      <div
        className="bg-[#F3F4F6] pt-16 pb-32 px-4 sm:px-6 lg:pb-40 lg:px-8"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >

      </div>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          filteredJobs.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h1 className="text-xl font-bold text-gray-800">{item.title}</h1>
              <p className="text-gray-600">{item.company.name}</p>
              <p className="text-gray-700">{item.description}</p>
              <div className='flex justify-end'>
                <button
                  className='bg-blue-500 text-white rounded-md px-4 py-2'
                  onClick={() => handleApply(item.id)}
                >
                  Apply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

