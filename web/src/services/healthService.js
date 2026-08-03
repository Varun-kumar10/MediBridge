import axios from "axios";

const API_URL = "http://localhost:3000/api/health";

export const getHeartRate = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/heart-rate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};