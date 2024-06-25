import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';
import { FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import '../css/TaskForm.css';

const TaskForm = ({ task, fetchTasks, startEditing }) => {
  const initialTaskState = { title: '', description: '', completed: false };
  const [editedTask, setEditedTask] = useState(initialTaskState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    } else {
      setEditedTask(initialTaskState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (task) {
        await updateTask(task.id, editedTask);
      } else {
        await createTask(editedTask);
      }
      fetchTasks();
      startEditing(null);
      setEditedTask(initialTaskState);
    } catch (error) {
      console.error('Error saving task:', error);
      setError('An error occurred while saving the task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    startEditing(null);
    setEditedTask(initialTaskState);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={editedTask.title}
        onChange={handleInputChange}
        required
        autoFocus
      />
      <textarea
        name="description"
        placeholder="Description"
        value={editedTask.description}
        onChange={handleInputChange}
        required
      />
      {error && <p className="error-message">{error}</p>}
      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? <FaSave className="icon-spin" /> : task ? <FaSave /> : <FaPlus />}
          {loading ? 'Saving...' : task ? 'Save' : 'Add Task'}
        </button>
        {task && (
          <button type="button" onClick={handleCancel}>
            <FaTimes /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
