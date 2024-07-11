import React, { useState } from 'react';

const JobManagement = ({ jobs, handleUpdateJob, handleDeleteJob, handleSubmitJob }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', company: '', description: '', status: 'open' });
  const [currentJob, setCurrentJob] = useState(null);

  const handleInputChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    handleSubmitJob(newJob);
    setNewJob({ title: '', company: '', description: '', status: 'open' });
    setShowCreateForm(false);
  };

  const handleUpdateExistingJob = (e) => {
    e.preventDefault();
    handleUpdateJob(currentJob.id, currentJob);
    setCurrentJob(null);
    setShowUpdateForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className='bg-blue-500 text-white px-4 my-4 py-2 rounded'
        onClick={() => setShowCreateForm(true)}
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
                <td className="border-b border-gray-300 px-4 py-2">3</td>
                <td className="border-b border-gray-300 px-4 py-2 flex justify-end">
                  <button
                    className="bg-blue-500 text-white rounded-md px-3"
                    onClick={() => {
                      setCurrentJob(job);
                      setShowUpdateForm(true);
                    }}
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

      {/* Add New Job Form */}
      {showCreateForm && (
      <div>
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
        <div className="mt-4 absolute top-20 left-1/4 w-1/2 rounded-lg bg-white p-4">
          <h2 className="text-xl font-bold">Add New Job</h2>
          <form onSubmit={handleCreateJob}>
            <div className="mb-4">
              <label className="block text-gray-700">Job Title:</label>
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={(e) => handleInputChange(e, setNewJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Company:</label>
              <input
                type="text"
                name="company"
                value={newJob.company}
                onChange={(e) => handleInputChange(e, setNewJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                value={newJob.description}
                onChange={(e) => handleInputChange(e, setNewJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status:</label>
              <select
                name="status"
                value={newJob.status}
                onChange={(e) => handleInputChange(e, setNewJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create Job</button>
            <button
              type="button"
              className="bg-red-500 bg-opacity-90 text-white px-4 py-2 rounded ml-2"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
        </div>
      )}

      {/* Update Job Form */}
      {showUpdateForm && currentJob && (
        <div>
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
        <div className="mt-4 absolute top-20 left-1/4 w-1/2 rounded-lg bg-white p-4">
        
          <h2 className="text-xl font-bold">Update Job</h2>
          <form onSubmit={handleUpdateExistingJob}>
            <div className="mb-4">
              <label className="block text-gray-700">Job Title:</label>
              <input
                type="text"
                name="title"
                value={currentJob.title}
                onChange={(e) => handleInputChange(e, setCurrentJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Company:</label>
              <input
                type="text"
                name="company"
                value={currentJob.company}
                onChange={(e) => handleInputChange(e, setCurrentJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                name="description"
                value={currentJob.description}
                onChange={(e) => handleInputChange(e, setCurrentJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Status:</label>
              <select
                name="status"
                value={currentJob.status}
                onChange={(e) => handleInputChange(e, setCurrentJob)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update Job</button>
            <button
              type="button"
              className="bg-red-500 bg-opacity-90 text-white px-4 py-2 rounded ml-2"
              onClick={() => {
                setShowUpdateForm(false);
                setCurrentJob(null);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      )}
    </div>
  );
}

export default JobManagement;
