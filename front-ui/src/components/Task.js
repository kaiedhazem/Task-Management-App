import React from 'react';
import { deleteTask, toggleTaskCompletion } from '../services/taskService';

const Task = ({ task, fetchTasks, startEditing }) => {
  const handleToggleCompletion = async () => {
    try {
      await toggleTaskCompletion(task.id, task);
      fetchTasks(); // Refetch tasks after toggling completion
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      fetchTasks(); // Refetch tasks after deleting a task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
      <button onClick={handleToggleCompletion}>
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button onClick={() => startEditing(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Task;
