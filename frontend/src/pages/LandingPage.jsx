import React, { useState } from 'react';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for handling form submission
    console.log('Form submitted with email:', email);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Job Portal</h1>
        <p className="text-gray-600 mb-4">Explore and find your dream job today!</p>

        {/* Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              className="w-full border-gray-300 rounded px-4 py-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              className="w-full border-gray-300 rounded px-4 py-2"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-300">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;



  