import React from 'react';
import { FaCheckCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteTask, toggleTaskCompletion } from '../../services/taskService';
import './Task.css';

/**
 * Task component displays individual task details and actions.
 * Props:
 * - task: Object containing task details (id, title, description, completed)
 * - fetchTasks: Function to refetch tasks after any action (completion, deletion)
 * - startEditing: Function to start editing the current task
 */
const Task = ({ task, fetchTasks, startEditing }) => {
  // Handles toggling task completion status
  const handleToggleCompletion = async () => {
    try {
      await toggleTaskCompletion(task.id, task);
      fetchTasks(); // Refetch tasks after toggling completion
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Handles deleting a task
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
        {/* Render different icon based on task completion status */}
        {task.completed ? <FaCheckCircle className="completed" /> : <FaCheckCircle className="not-completed" />}
      </div>
      <p className="task-desc">{task.description}</p>
      <div className="task-actions">
        {/* Button to toggle task completion */}
        <button
          className={`action-button ${task.completed ? 'button-incomplete' : 'button-complete'}`}
          onClick={handleToggleCompletion}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        {/* Button to start editing the task */}
        <button className="action-button button-edit" onClick={() => startEditing(task)}>
          <FaEdit /> Edit
        </button>
        {/* Button to delete the task */}
        <button className="action-button button-delete" onClick={handleDelete}>
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
