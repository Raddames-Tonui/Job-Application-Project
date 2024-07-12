import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { authToken, currentUser } = useContext(UserContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    fetch('http://127.0.0.1:5555/jobs')
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

  const handleApply = (itemId) => {
    const item = jobs.find(job => job.id === itemId);

    if (item) {
      const storedJobs = JSON.parse(localStorage.getItem('storedJobs')) || [];
      storedJobs.push(item);
      localStorage.setItem('storedJobs', JSON.stringify(storedJobs));
      toast.success('Application submitted successfully!');
    } else {
      toast.error('Error submitting application.');
    }
  };

  const handleDelete = (itemId) => {
    let storedJobs = JSON.parse(localStorage.getItem('storedJobs')) || [];
    storedJobs = storedJobs.filter(job => job.id !== itemId);
    localStorage.setItem('storedJobs', JSON.stringify(storedJobs));
    toast.success('Item deleted successfully!');
  };

  const isJobStored = (itemId) => {
    const storedJobs = JSON.parse(localStorage.getItem('storedJobs')) || [];
    return storedJobs.some(job => job.id === itemId);
  };

  return (
    <div className="container mx-auto p-4">
      {currentUser && currentUser.email ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            filteredJobs.map((item) => (
              <div key={item.id} className={`block rounded-lg text-center shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface ${isJobStored(item.id) ? 'bg-yellow-200' : 'bg-blue-200'}`}>
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
                  <div className='flex gap-4 justify-center'>
                    <button
                      type="button"
                      className="inline-block rounded bg-blue-500 hover:bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      onClick={() => handleApply(item.id)}
                    >
                      Apply now
                    </button>
                    <button
                      className="inline-block rounded bg-red-500 hover:bg-red-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-red-600 focus:bg-red-600 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="inline-block rounded bg-blue-500 hover:bg-blue-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    >
                      <Link to={`/jobs/apply/${item.id}`}>
                        More Details
                      </Link>
                    </button>
                  </div>
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
      ) : (
        <h3>Please login</h3>
      )}
    </div>
  );
};

export default Dashboard;
