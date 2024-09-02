import axiosInstance from "../interceptors/axiosInstance";

const API_URL = "/user";

const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/signup`, userData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { signupUser, loginUser, getUserProfile };
