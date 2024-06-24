import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (newTask) => {
  try {
    const response = await axios.post(API_URL, newTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
  } catch (error) {
    throw error;
  }
};

export const toggleTaskCompletion = async (taskId, task) => {
  try {
    const taskEdited = {
        title: task.title,
        description: task.description,
        completed: !task.completed
    }
    const response = await axios.put(`${API_URL}/${taskId}`, taskEdited);
    return response.data;
  } catch (error) {
    throw error;
  }
};
