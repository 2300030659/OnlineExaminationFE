import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

// Get Token from Local Storage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch User Profile
export const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/profile`, { headers: getAuthHeaders() });
    return res.data;
  } catch (err) {
    console.error("Error fetching profile:", err);
    throw err;
  }
};
