// fetchWithAuth.js
import { store } from "../redux/store";

const fetchWithAuth = async (url, options = {}) => {
  // Get the authentication token from Redux store
  const token = store.getState().user.currentUser?.accessToken;

  // Add the Authorization header if a token is available
  if (token) {
    options.headers = {
      ...(options.headers || {}), // Existing headers
      Authorization: token ? `Bearer ${token}` : undefined, // Authorization header
      "Content-Type": "application/json; charset=utf-8", // Content-Type header
    };
  }

  // Make the fetch request with the modified options
  const response = await fetch(url, options);
  // Handle 304 Not Modified response
  if (response.status === 304) {
    console.log("Resource not modified. Using cached data.");
    // Return early without parsing response body
    return null;
  }

  // Handle other non-304 responses
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

export default fetchWithAuth;
