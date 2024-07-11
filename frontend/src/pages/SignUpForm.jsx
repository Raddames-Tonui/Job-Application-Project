import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function SignUpForm() {
  const { register } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    register(username, email, password);
  }

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container mt-5">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-xl text-center text-gray-700 mb-4">
                REGISTER NEW ACCOUNT
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="repeatPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="repeatPassword"
                    placeholder="Confirm Password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Signup
                  </button>
                </div>
              </form>
              <p className="text-center mt-4 text-gray-600 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:text-blue-700">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpForm;
