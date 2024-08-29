import axios from "axios";

const API_URL = "http://localhost:4000/user";

const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    localStorage.setItem("token", response.data.token);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { signupUser, loginUser, getUserProfile };
