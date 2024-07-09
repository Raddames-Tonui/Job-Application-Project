import React from 'react';

const RegisterCompany = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const companyData = {
      companyName: formData.get('companyName'),
      industry: formData.get('industry'),
      location: formData.get('location'),
    };
    
    try {
      const response = await fetch('/api/register-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const result = await response.json();
      console.log('Company registered successfully:', result);
      // Optionally display a success message or redirect to another page
    } catch (error) {
      console.error('Error registering company:', error);
      // Optionally display an error message to the user
    }

    // Reset the form 
    event.target.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Register Your Company</h1>
        <p className="text-center text-gray-700 mb-4">
          Welcome! Register your company to start posting jobs and connecting with potential candidates.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
            <input type="text" id="companyName" name="companyName" className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
          </div>
          <div className="mb-4">
            <label htmlFor="industry" className="block text-gray-700">Industry</label>
            <input type="text" id="industry" name="industry" className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input type="text" id="location" name="location" className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterCompany;
