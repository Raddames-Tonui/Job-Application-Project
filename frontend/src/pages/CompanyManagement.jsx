import React, { useState } from "react";

function CompanyManagement({
  companies,
  handleDeleteCompany,
  handleUpdateCompany,
  handleSubmitCompany,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: "",
    description: "",
    location: "",
  });
  const [currentCompany, setCurrentCompany] = useState(null);

  const handleInputChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNewCompany = (e) => {
    e.preventDefault();
    handleSubmitCompany(newCompany).then((data) => {
      setCompanies([...companies, data]); // Update the list of companies
      setNewCompany({ name: "", description: "", location: "" }); // Reset form fields
      setShowAddModal(false);
    }).catch((error) => {
      console.error('Error creating company:', error);
      // Handle error if needed
    });
  };

  const handleUpdateExistingCompany = (e) => {
    e.preventDefault();
    handleUpdateCompany(currentCompany.id, currentCompany);
    setCurrentCompany(null);
    setShowUpdateModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 my-4 py-2 rounded"
        onClick={() => setShowAddModal(true)}
      >
        Add New Company
      </button>
      <table className="min-w-full text-left bg-white">
        <thead>
          <tr className="w-full flex bg-gray-200 text-gray-600 text-sm leading-normal">
            <th className="border-b px-2 py-2 w-1/4">Name</th>
            <th className="border-b px-2 py-2 w-1/4">Description</th>
            <th className="border-b px-2 py-2 w-1/4">Location</th>
            <th className="border-b px-2 py-2 w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr
              className="w-full flex border-b border-gray-200 hover:bg-gray-100"
              key={company.id}
            >
              <td className="px-2 py-2 w-1/4">{company.name}</td>
              <td className="px-2 py-2 w-1/4">{company.description}</td>
              <td className="px-2 py-2 w-1/4">{company.location}</td>
              <td className="px-2 py-2 w-1/4">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleDeleteCompany(company.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setCurrentCompany(company);
                    setShowUpdateModal(true);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Company Form */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Add New Company</h2>
            <form onSubmit={handleAddNewCompany}>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newCompany.name}
                  onChange={(e) => handleInputChange(e, setNewCompany)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={newCompany.description}
                  onChange={(e) => handleInputChange(e, setNewCompany)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={newCompany.location}
                  onChange={(e) => handleInputChange(e, setNewCompany)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add Company
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Company Form */}
      {showUpdateModal && currentCompany && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Update Company</h2>
            <form onSubmit={handleUpdateExistingCompany}>
              <div className="mb-4">
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={currentCompany.name}
                  onChange={(e) => handleInputChange(e, setCurrentCompany)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description:</label>
                <textarea
                  name="description"
                  value={currentCompany.description}
                  onChange={(e) => handleInputChange(e, setCurrentCompany)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location:</label>
                <input
                  type="text"
                  name="location"
                  value={currentCompany.location}
                  onChange={(e) => handleInputChange(e, setCurrentCompany)}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Update Company
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setCurrentCompany(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyManagement;
