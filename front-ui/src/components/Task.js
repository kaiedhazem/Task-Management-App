import React from 'react';
import { FaCheckCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteTask, toggleTaskCompletion } from '../services/taskService';
import '../css/Task.css';

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
    <div className="task-item">
      <div className="task-header">
        <h3>{task.title}</h3>
        {task.completed ? <FaCheckCircle className="completed" /> : <FaCheckCircle className="not-completed" />}
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-actions">
        <button
          className={`action-button ${task.completed ? 'button-incomplete' : 'button-complete'}`}
          onClick={handleToggleCompletion}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button className="action-button button-edit" onClick={() => startEditing(task)}>
          <FaEdit /> Edit
        </button>
        <button className="action-button button-delete" onClick={handleDelete}>
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
