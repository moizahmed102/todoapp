import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { getAllTasksForAdmin, updateTask, deleteTask } from '../services/taskService';
import { logout } from '../features/auth/authSlice';

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const tasksPerPage = 10;

  useEffect(() => {
    fetchTasks(); 
  }, [currentPage, navigate]);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasksForAdmin(currentPage);
      setTasks(data.data.tasks || []);
      setTotalTasks(data.data.totalTasks || 0);
    } catch (error) {
      console.error(error);
      navigate('/login'); 
    }
  };

  const handleUpdateTask = async (taskId) => {
    try {
      await updateTask(taskId, { task: newTaskText });
      setEditingTaskId(null);
      setNewTaskText('');
      fetchTasks(); 
    } catch (error) {
      console.log("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks(); 
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * tasksPerPage < totalTasks) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Admin Dashboard</h1>
      <ul className="list-group mb-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              {editingTaskId === task._id ? (
                <div className="d-flex">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    className="form-control me-2"
                  />
                  <button
                    className="btn btn-sm btn-outline-success me-2"
                    onClick={() => handleUpdateTask(task._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => {
                      setEditingTaskId(null);
                      setNewTaskText('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="d-flex justify-content-between align-items-center w-100">
                  <span>{task.task}</span>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => {
                        setEditingTaskId(task._id);
                        setNewTaskText(task.task);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))
        ) : (
          <li className="list-group-item">No tasks available</li>
        )}
      </ul>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={(currentPage + 1) * tasksPerPage >= totalTasks}
        >
          Next
        </button>
      </div>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
