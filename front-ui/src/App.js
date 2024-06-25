import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm/TaskForm';
import Task from './components/Task/Task';
import Pagination from './components/Pagination/Pagination';
import { fetchTasks } from './services/taskService';
import './App.css';

const App = () => {
  // State variables
  const [tasks, setTasks] = useState([]); // Holds the list of tasks
  const [editingTask, setEditingTask] = useState(null); // Tracks the task being edited
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page for pagination
  const tasksPerPage = 6; // Number of tasks per page

  // Fetch tasks data when component mounts
  useEffect(() => {
    fetchTaskData();
  }, []);

  // Function to fetch tasks data asynchronously
  const fetchTaskData = async () => {
    try {
      const tasksData = await fetchTasks(); // Fetch tasks from API
      setTasks(tasksData); // Update tasks state
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Sets the task to edit
  const startEditing = (task) => {
    setEditingTask(task);
  };

  // Cancels task editing
  const cancelEditing = () => {
    setEditingTask(null);
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage; // Index of last task on current page
  const indexOfFirstTask = indexOfLastTask - tasksPerPage; // Index of first task on current page
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask); // Tasks for current page

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management Application</h1>
        {/* TaskForm component for adding/editing tasks */}
        <TaskForm task={editingTask} fetchTasks={fetchTaskData} startEditing={cancelEditing} />
      </header>
      <main className="App-main">
        <div className="task-list">
          {/* Render each task in the current page */}
          {currentTasks.map((task) => (
            <Task key={task.id} task={task} fetchTasks={fetchTaskData} startEditing={startEditing} />
          ))}
        </div>
        {/* Pagination component */}
        <Pagination tasksPerPage={tasksPerPage} totalTasks={tasks.length} paginate={paginate} currentPage={currentPage} />
      </main>
    </div>
  );
};

export default App;

