import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [onChange, setOnChange] = useState(false);
  const [auth_token, setAuth_token] = useState(() => localStorage.getItem("access_token") || null);
  const [currentUser, setCurrentUser] = useState(null);

  // Register User
  const register = (username, email, password) => {
    fetch('http://localhost:5555/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })
    .then(res => res.json())
    .then(res => {
      if (res.message === "User created successfully") {
        navigate('/login');
        toast.success("Registration successful. Please login.");
      } else if (res.message === "User with this email or username already exists") {
        toast.error("User with this email or username already exists.");
      } else {
        toast.error("Registration failed.");
      }
    });

  };

  // Login User
  const login = (email, password) => {
    fetch('http://localhost:5555/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(res => {
      if (res.access_token) {
        setAuth_token(res.access_token);
        localStorage.setItem('access_token', res.access_token);

        // Check if the user is an admin and navigate accordingly
        if (res.is_admin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }

        toast.success("Login successful.");
      } else {
        toast.error("Invalid username or password.");
      }
    });

  };

  // Update User
  const update_user = (name, phone_number, is_organizer, password) => {
    const server_url = 'http://localhost:5555'; // Define server_url if not already defined
    fetch(`${server_url}/users`, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        password: password,
        phone_number: phone_number,
        is_organizer: is_organizer
      }),
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      },
    })
    .then(response => response.json())
    .then(res => {
      if (res.success) {
        toast.success(res.success);
      } else if (res.error) {
        toast.error(res.error);
      } else {
        toast.error("An error occurred.");
      }
    });

  };

  // Logout User
  const logout = () => {
    fetch('http://localhost:5555/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      }
    })
    .then(response => response.json())
    .then(res => {
      if (res.success) {
        localStorage.removeItem("access_token");
        setCurrentUser(null);
        setAuth_token(null);
        setOnChange(!onChange);
        toast.success(res.success);
      } else if (res.error) {
        toast.error(res.error);
      } 
    });

  };

  useEffect(() => {
    if (auth_token) {
      fetch('http://localhost:5555/current_user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          setCurrentUser(data);
        } else {
          localStorage.removeItem('access_token');
          setAuth_token(null);
          setCurrentUser(null);
          navigate("/login");
        }
      });
    }
  }, [auth_token, onChange]);
  // ============================
  console.log(currentUser);
  console.log(auth_token)
  const contextData = {
    auth_token,
    currentUser,
    setCurrentUser,
    register,
    login,
    logout,
    update_user
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};
