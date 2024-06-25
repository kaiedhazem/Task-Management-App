import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../../services/taskService';
import { FaSave, FaPlus, FaTimes } from 'react-icons/fa';
import './TaskForm.css';

/**
 * TaskForm component handles the form for creating or editing tasks.
 * Props:
 * - task: Object containing task details (id, title, description, completed)
 * - fetchTasks: Function to refetch tasks after any action (create/update)
 * - startEditing: Function to start editing a task or cancel editing
 */
const TaskForm = ({ task, fetchTasks, startEditing }) => {
  const initialTaskState = { title: '', description: '', completed: false };
  const [editedTask, setEditedTask] = useState(initialTaskState); // State to hold edited task details
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(null); // Error state for displaying form submission errors

  // Effect to update form fields when task prop changes
  useEffect(() => {
    if (task) {
      setEditedTask({ ...task }); // Populate form fields if editing an existing task
    } else {
      setEditedTask(initialTaskState); // Reset form fields if creating a new task
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  // Handle form submission (create new task or update existing task)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (task) {
        await updateTask(task.id, editedTask); // Update existing task
      } else {
        await createTask(editedTask); // Create new task
      }
      fetchTasks(); // Refetch tasks to update the task list
      startEditing(null); // Exit editing mode
      setEditedTask(initialTaskState); // Reset form fields
    } catch (error) {
      console.error('Error saving task:', error);
      setError('An error occurred while saving the task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel button click to exit editing mode
  const handleCancel = () => {
    startEditing(null); // Exit editing mode
    setEditedTask(initialTaskState); // Reset form fields
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
