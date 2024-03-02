import api from "../../utils/api";
import apiHost2 from "../../utils/apiHost2";
export const fetchMenuItems = async () => {
  try {
    const response = await api.get("/MenuItems"); // Adjust this to your actual API endpoint
    return response.data; // Assuming the response data is the array of menu items
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
};
export const getAllOrders = async () => {
  try {
    const response = await apiHost2.get("/orders"); // Adjust this to your actual API endpoint
    return response.data; // Assuming the response data is the array of menu items
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
};
