import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import Task from './components/Task';
import { fetchTasks } from './services/taskService';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

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

  return (
    <div className="App">
      <h1>Task Management Application</h1>
      <TaskForm task={editingTask} fetchTasks={fetchTaskData} startEditing={cancelEditing} />
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            {editingTask === task ? (
              <TaskForm task={editingTask} fetchTasks={fetchTaskData} startEditing={cancelEditing} />
            ) : (
              <Task task={task} fetchTasks={fetchTaskData} startEditing={startEditing} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
