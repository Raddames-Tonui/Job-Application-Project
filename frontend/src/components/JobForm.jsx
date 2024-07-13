import React from 'react';
import PropTypes from 'prop-types';

const JobForm = ({ job, handleInputChange, handleSubmit, handleCancel }) => (
  <div>
    <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
    <div className="mt-4 absolute top-20 left-1/4 w-1/2 rounded-lg bg-white p-4">
      <h2 className="text-xl font-bold">{job.id ? 'Update Job' : 'Add New Job'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Job Title:</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={(e) => handleInputChange(e)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Company:</label>
          <input
            type="text"
            name="company"
            value={job.company}
            onChange={(e) => handleInputChange(e)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={job.description}
            onChange={(e) => handleInputChange(e)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <select
            name="status"
            value={job.status}
            onChange={(e) => handleInputChange(e)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{job.id ? 'Update Job' : 'Create Job'}</button>
        <button
          type="button"
          className="bg-red-500 bg-opacity-90 text-white px-4 py-2 rounded ml-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
);

JobForm.propTypes = {
  job: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default JobForm;
