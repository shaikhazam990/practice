
import axios from "axios";

const ApiInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

const handleError = (error) => {
  const message =
    error.response?.data?.error ||
    error.response?.data?.message ||
    error.message ||
    "Something went wrong";

  throw new Error(message);
};

export const getTasks = async () => {
  try {
    const response = await ApiInstance.get("/tasks");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addTask = async (task) => {
  try {
    const response = await ApiInstance.post("/tasks", task);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const removeTask = async (taskId) => {
  try {
    const response = await ApiInstance.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await ApiInstance.put(
      `/tasks/${taskId}`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default {
  getTasks,
  addTask,
  removeTask,
  updateTask,
};
