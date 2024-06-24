import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';

const TaskForm = ({ task, fetchTasks, startEditing }) => {
  const [editedTask, setEditedTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task.id, editedTask);
      } else {
        await createTask(editedTask);
      }
      fetchTasks(); // Refetch tasks after updating or creating a task
      startEditing(null); // Exit edit mode
      
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={editedTask.title} onChange={handleInputChange} required />
      <textarea name="description" placeholder="Description" value={editedTask.description} onChange={handleInputChange} required />
      <button type="submit">{task ? 'Save' : 'Add Task'}</button>
      {task && <button type="button" onClick={() => startEditing(null)}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
