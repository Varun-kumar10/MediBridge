import axios from "axios";

const API_URL = "http://localhost:3000/api/dashboard";

export const getDashboardSummary = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Unable to load dashboard summary.",
      }
    );
  }
};