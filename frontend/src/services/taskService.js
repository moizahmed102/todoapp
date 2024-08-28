import axios from "axios";

const API_URL = "http://localhost:4000/tasks";

const getTasks = async (page = 0) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}?page=${page}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error.response.data;
  }
};

export { getTasks, createTask, updateTask, deleteTask };
