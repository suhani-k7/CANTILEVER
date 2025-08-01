import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to Your Task Manager</h2>
      <p>Plan. Prioritize. Conquer.</p>
      <div className="home-buttons">
      <Link to="/tasks">
        <button>
          View Tasks
        </button>
      </Link>
      <Link to="/add-task">
        <button>
          Add a Task
        </button>
      </Link>
      </div>
    </div>
  );
}

export default Home;