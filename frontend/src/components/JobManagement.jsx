import React, { useState } from 'react';
import PropTypes from 'prop-types';
import JobForm from './JobForm';

const JobManagement = ({ jobs, handleUpdateJob, handleDeleteJob, handleSubmitJob }) => {
  const [showForm, setShowForm] = useState(false);
  const [job, setJob] = useState({ title: '', company: '', description: '', status: 'open' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (job.id) {
      handleUpdateJob(job.id, job);
    } else {
      handleSubmitJob(job); // Using handleSubmitJob from props to handle job submission
    }
    setJob({ title: '', company: '', description: '', requirements: '',status: 'open' });
    setShowForm(false);
  };

  const handleUpdateClick = (job) => {
    setJob(job);
    setShowForm(true);
  };

  const handleCancel = () => {
    setJob({ title: '', company: '', description: '', status: 'open' });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className='bg-blue-500 text-white px-4 my-4 py-2 rounded'
        onClick={() => setShowForm(true)}
      >
        Add New Job
      </button>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-200 text-gray-600 text-sm leading-normal">
                  <tr>
                    <th className="border-b border-gray-300 px-4 py-2">Job Title</th>
                    <th className="border-b border-gray-300 px-4 py-2">Company</th>
                    <th className="border-b border-gray-300 px-4 py-2">Description</th>
                    <th className="border-b border-gray-300 px-4 py-2">Applicants</th>
                    <th className="border-b border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-100">
                      <td className="border-b border-gray-300 px-4 py-2 text-gray-800 font-semibold">{job.title}</td>
                      <td className="border-b border-gray-300 px-4 py-2 text-gray-600">{job.company.name}</td>
                      <td className="border-b border-gray-300 px-4 py-2 text-gray-700">{job.description}</td>
                      {/* <td className="border-b border-gray-300 px-4 py-2">{job.applicants.length}</td> */}
                      <td className="border-b border-gray-300 px-4 py-2 flex justify-end">
                        <button
                          className="bg-blue-500 text-white rounded-md px-3"
                          onClick={() => handleUpdateClick(job)}
                        >
                          Update
                        </button>
                        <button
                          className="bg-red-500 text-white rounded-md px-4 py-3"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <JobForm
          job={job}
          handleInputChange={handleInputChange}
          handleSubmit={handleFormSubmit}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

JobManagement.propTypes = {
  jobs: PropTypes.array.isRequired,
  handleUpdateJob: PropTypes.func.isRequired,
  handleDeleteJob: PropTypes.func.isRequired,
  handleSubmitJob: PropTypes.func.isRequired,
};

export default JobManagement;
