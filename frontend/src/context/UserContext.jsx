import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('token') ? localStorage.getItem('token') : null);
  const [currentUser, setCurrentUser] = useState(null);

  // Register User
  const register = (username, email, password, navigate) => {
    fetch('http://localhost:5555/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,  
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.message === "User created successfully") {
        navigate('/login');
        alert("Registration successful. Please login.");
      } else if (res.message === "User with this email or username already exists") {
        alert("User with this email or username already exists.");
      } 
    });
  };

  // Login User
  const login = (email, password, navigate) => {
    fetch('http://localhost:5555/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.access_token) {
        setAuthToken(res.access_token);
        localStorage.setItem('token', res.access_token);
  
        // Check if the user is an admin and navigate accordingly
        if (res.is_admin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
        
        alert("Login successful.");
      } else {
        alert("Invalid username or password.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred during login.");
    });
  };

  // Logout User
  const logout = (navigate) => {
    fetch('http://localhost:5555/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.message === "Successfully logged out") {
        setAuthToken(null);
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/login');
        alert("Logged out successfully.");
      } else {
        alert("Failed to logout.");
      }
    });
  };

  useEffect(() => {
    if (authToken) {
      fetch('http://localhost:5555/current_user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      })
      .then(res => res.json())
      .then(res => {
        setCurrentUser(res);
      });
    } else {
      setCurrentUser(null);
    }
  }, [authToken]);

  const contextData = {
    currentUser,
    register,
    login,
    logout
  };

 


  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};
