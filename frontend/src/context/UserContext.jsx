import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { server_url } from "../../config.json";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth_token, setAuth_token] = useState(() => localStorage.getItem("access_token") || null);
  const [currentUser, setCurrentUser] = useState(null);

  // Register User
  const register = (username, email, password, profile_pictures) => {
    fetch(`${server_url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, is_admin: false, profile_pictures })
    })
    .then(res => res.json())
    .then(res => {
      if (res.message === "User created successfully") {
        navigate('/user');
        toast.success("Registration successful.");
      } else if (res.message === "User with this email or username already exists") {
        toast.error("User with this email or username already exists.");
      } else {
        toast.error("Registration failed.");
      }
    });

  };

  // Login User
  const login = (email, password) => {
    fetch(`${server_url}/login`, {
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
        setIsLoggedIn(true);
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        setCurrentUser({ ...res, email }); // Assuming the backend sends is_admin in the response

        if (res.is_admin) {
          navigate('/admin'); 
        } else {
          navigate('/user');  
        }

        toast.success("Login successful.");
      } else {
        toast.error("Invalid username or password.");
      }
    })
    .catch(error => {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again later.");
    });
  };

  // Logout User
  const logout = () => {
    fetch(`${server_url}/logout`, {
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
        localStorage.removeItem("refresh_token");
        setAuth_token(null);
        setCurrentUser(null);
        setIsLoggedIn(false);
        toast.success(res.success);
        navigate("/login");
      } else if (res.error) {
        toast.error(res.error);
      }
    })
    .catch(error => {
      console.error('Error logging out:', error);
      toast.error('Error logging out. Please try again.');
    });
  };

  useEffect(() => {
    if (auth_token) {
      fetch(`${server_url}/current_user`, {
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
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
        localStorage.removeItem('access_token');
        setAuth_token(null);
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate("/login");
      });
    } else {
      setCurrentUser(null);
      navigate("/login");
    }
  }, [auth_token, navigate]);

  const contextData = {
    auth_token,
    currentUser,
    isLoggedIn,
    setCurrentUser,
    register,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};
