import React, { createContext, useState, useEffect } from "react";
import apiAuth from "../utils/apiAuth";
// Create the Auth Context
export const AuthContext = createContext();

// Create the Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to login user and set JWT token
  const login = (token) => {
    // Set the user and token in the state
    setUser(token);
    // Save the token in local storage
    localStorage.setItem("accessToken", token);
  };

  // Function to logout user and remove JWT token
  const logout = () => {
    // Remove the user and token from the state
    setUser(null);
    // Remove the token from local storage
    localStorage.removeItem("accessToken");
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    // Check if the user and token exist
    return user !== null && localStorage.getItem("accessToken") !== null;
  };

  // Function to load user from local storage on app start
  const loadUser = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Set the user from the token
      setUser(token);
    }
    // Set loading to false
    setIsLoading(false);
  };

  // Run the loadUser function on app start
  useEffect(() => {
    loadUser();
  }, []);

  // Render the Auth Provider with the auth context value
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
