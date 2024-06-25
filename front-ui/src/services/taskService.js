import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

// Function to fetch all tasks from the API
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the data fetched from the API
  } catch (error) {
    throw error; // Throw any error that occurs during the API call
  }
};

// Function to create a new task by sending a POST request
export const createTask = async (newTask) => {
  try {
    const response = await axios.post(API_URL, newTask);
    return response.data; // Return the newly created task data from the API response
  } catch (error) {
    throw error; // Throw any error that occurs during the API call
  }
};

// Function to update an existing task identified by taskId using a PUT request
export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data; // Return the updated task data from the API response
  } catch (error) {
    throw error; // Throw any error that occurs during the API call
  }
};

// Function to delete a task identified by taskId using a DELETE request
export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`${API_URL}/${taskId}`);
    // No need to return data for delete operation
  } catch (error) {
    throw error; // Throw any error that occurs during the API call
  }
};

// Function to toggle the completion status of a task identified by taskId using a PUT request
export const toggleTaskCompletion = async (taskId, task) => {
  try {
    // Create an updated task object with the toggled completion status
    const updatedTask = {
      title: task.title,
      description: task.description,
      completed: !task.completed
    };
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask);
    return response.data; // Return the updated task data from the API response
  } catch (error) {
    throw error; // Throw any error that occurs during the API call
  }
};
