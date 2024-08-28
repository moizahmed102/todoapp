import React from 'react';
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="container text-center mt-5">
      <header className="mb-5">
      <h1 className="display-4">Welcome to the Task Manager</h1>
      <p className="lead">Your one-stop solution for managing tasks efficiently.</p>
      </header>
      <div className="mb-5">
          <h2>Get Started</h2>
          <p>To get started, you can:</p>
          <ul className="list-unstyled">
          <li className="mb-3"><Link to="/signup" className="btn btn-primary btn-lg">SignUp</Link></li>
            <li><Link to="/login" className="btn btn-secondary btn-lg">LogIn</Link></li>
          </ul>
      </div>
      <footer className="mt-5">
        <p>&copy; 2024 Task Manager</p>
      </footer>
    </div>
  );
}

export default LandingPage;
