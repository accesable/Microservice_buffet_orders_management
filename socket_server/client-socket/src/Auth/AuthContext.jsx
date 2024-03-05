import React, { createContext, useState, useEffect } from "react";
import axios from "axios"; // Import Axios

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to login user using Axios
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8086/api/users/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Assuming the response includes the user data and the token
      setUser(response.data.user); // Set the user in the state
      localStorage.setItem("accessToken", response.data.token); // Save the token
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      // Handle login error (e.g., show an error message)
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const isAuthenticated = () => {
    return user !== null && localStorage.getItem("accessToken") !== null;
  };

  const loadUser = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Optionally, validate the token with the backend
      // For now, we'll just assume the token is still valid
      // setUser based on token or fetch user details using the token
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
