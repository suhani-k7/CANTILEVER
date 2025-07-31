// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1>Task Manager</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-task">Add Task</Link>
        <Link to="/tasks">View Tasks</Link>
      </nav>
    </header>
  );
}

export default Header;
