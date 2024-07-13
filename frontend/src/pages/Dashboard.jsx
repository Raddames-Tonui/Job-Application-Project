import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { server_url } from '../../config.json';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { authToken } = useContext(UserContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch(`${server_url}/jobs`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }
        return res.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApply = (jobId) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ job_id: jobId, status: 'pending' }), 
    };
 
  
    fetch(`${server_url}/applications/${jobId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((res) => {
        if (res.message) {
          toast.success(res.message);
          // Optionally update UI or navigate upon successful submission
        } else {
          console.log('An error occurred')
        }
      })
      .catch((error) => {
        console.error('Error applying for job:', error);
        toast.error('Failed to apply for job');
      });
  };
  

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          filteredJobs.map((item) => (
            <div key={item.id} className="block rounded-lg bg-blue-200 text-center shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
              <div className="font-bold border-b-2 border-neutral-100 px-6 py-3 dark:border-white/10">
                Featured Jobs
              </div>
              <div className="p-6">
                <h5 className="mb-2 text-xl leading-tight font-bold">
                  {item.title}
                </h5>
                <p className="mb-4 text-base">
                  Company: {item.company.name}
                </p>
                <p className="mb-4 text-base">
                  Job Description: {item.description}
                </p>
                <button
                  type="button"
                  className="inline-block rounded bg-blue-500 hover:bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  onClick={() => handleApply(item.id)}
                >
                  Apply
                </button>
                {/* <Link to={`/jobs/apply/${item.id}`}>
                  Hello
                </Link> */}
              </div>
              <div className="border-t-2 flex gap-2 justify-center border-neutral-100 px-6 py-3 dark:border-white/10 text-surface/75 dark:text-neutral-300 gap">
                <div className='font-bold'>Job posted on:</div>
                <div className=''>{new Date(item.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;

