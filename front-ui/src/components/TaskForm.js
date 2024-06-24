import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';

const TaskForm = ({ task, fetchTasks, startEditing }) => {
  // Définition de l'état initial vide
  const initialTaskState = { title: '', description: '', completed: false };
  const [editedTask, setEditedTask] = useState(initialTaskState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mettre à jour l'état du formulaire lorsque la tâche change
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
      fetchTasks(); // Refetch tasks after updating or creating a task
      startEditing(null); // Exit edit mode
      setEditedTask(initialTaskState); // Réinitialiser le formulaire après soumission
    } catch (error) {
      console.error('Error saving task:', error);
      setError('An error occurred while saving the task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (editedTask.title !== task?.title || editedTask.description !== task?.description) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        return;
      }
    }
    startEditing(null); // Exit edit mode without saving
    setEditedTask(initialTaskState); // Réinitialiser le formulaire après annulation
  };

  return (
    <form onSubmit={handleSubmit}>
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : task ? 'Save' : 'Add Task'}
      </button>
      {task && <button type="button" onClick={handleCancel}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
