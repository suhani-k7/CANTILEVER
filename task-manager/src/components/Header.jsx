import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div>
        <h1>Task Manager</h1>
        {user && (
          <div className="user-info">
            <span>Logged in as <strong>{user.username}</strong></span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/add-task">Add Task</Link>
        <Link to="/tasks">View Tasks</Link>
      </nav>
    </header>
  );
}

export default Header;
