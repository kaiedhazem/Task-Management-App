import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import Task from './components/Task';
import Pagination from './components/Pagination';
import { fetchTasks } from './services/taskService';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Management Application</h1>
        <TaskForm task={editingTask} fetchTasks={fetchTaskData} startEditing={cancelEditing} />
      </header>
      <main className="App-main">
        <div className="task-list">
          {currentTasks.map((task) => (
            <Task key={task.id} task={task} fetchTasks={fetchTaskData} startEditing={startEditing} />
          ))}
        </div>
        <Pagination tasksPerPage={tasksPerPage} totalTasks={tasks.length} paginate={paginate} currentPage={currentPage} />
      </main>
    </div>
  );
};

export default App;
