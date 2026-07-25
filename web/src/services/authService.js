import axios from "axios";

// Backend API Base URL
const API_URL = "http://localhost:3000/api/auth";

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Something went wrong. Please try again.",
      }
    );
  }
};