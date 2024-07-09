import React from 'react';
const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    
    // perform validation or send this data to your backend API here
    console.log('User Data:', userData);
    
    // Reset 
    event.target.reset();
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">Log in to your account to continue</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">New to our platform? <a href="#" className="text-blue-600 hover:underline">Sign Up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
