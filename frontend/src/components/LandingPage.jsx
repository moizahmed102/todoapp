import React from 'react';
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="home">
      <header>
        <h1>Welcome to the Task Manager</h1>
        <p>Your one-stop solution for managing tasks efficiently.</p>
      </header>
      <div>
          <h2>Get Started</h2>
          <p>To get started, you can:</p>
          <ul>
            <li><Link to="/signup">Register an account</Link></li>
            <li><Link to="/login">Log in to your account</Link></li>
          </ul>
      </div>
      <footer>
        <p>&copy; 2024 Task Manager</p>
      </footer>
    </div>
  );
}

export default Dashboard;
