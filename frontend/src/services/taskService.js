import axiosInstance from "../interceptors/axiosInstance";

const API_URL = "/tasks";

const getTasks = async (page = 0) => {
  try {
    const response = await axiosInstance.get(`${API_URL}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllTasksForAdmin = async (page = 0) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/admin`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post(API_URL, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    await axiosInstance.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    throw error;
  }
};

export { getTasks, getAllTasksForAdmin, createTask, updateTask, deleteTask };
