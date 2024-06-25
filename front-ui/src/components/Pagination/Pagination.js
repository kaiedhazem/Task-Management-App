import React from 'react';
import './Pagination.css';

/**
 * Pagination component handles pagination UI for task list.
 * Props:
 * - tasksPerPage: Number of tasks to display per page
 * - totalTasks: Total number of tasks in the list
 * - paginate: Function to handle pagination button click
 * - currentPage: Current active page number
 */
const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];

  // Calculate total number of pages based on tasksPerPage and totalTasks
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        {/* Map through pageNumbers array to render pagination buttons */}
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            {/* Button for each page number, with onClick handler to call paginate function */}
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
