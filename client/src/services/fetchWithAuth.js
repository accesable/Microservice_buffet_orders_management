// fetchWithAuth.js
import { store } from "../redux/store";

const fetchWithAuth = async (url, options = {}) => {
  // Get the authentication token from Redux store
  const token = store.getState().user.currentUser?.accessToken;

  // Add the Authorization header if a token is available
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Make the fetch request with the modified options
  const response = await fetch(url, options);
  return response;
};

export default fetchWithAuth;
