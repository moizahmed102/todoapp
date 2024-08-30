import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getUserProfileThunk, logout } from '../features/auth/authSlice';
import { createTask, updateTask, deleteTask, getTasks } from '../services/taskService';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const tasksPerPage = 10;

  const { token } = useSelector((state) => state.auth); 
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(getUserProfileThunk());
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks(currentPage);
        setTasks(data.data.tasks || []);
        setTotalTasks(data.data.totalTasks || 0);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTasks();
  }, [currentPage]);

  const updatePageInUrl = (page) => {
    setSearchParams({ page });
  };

  const handleCreateTask = async () => {
    if (!newTask) return;
    try {
      await createTask({ task: newTask });
      setNewTask("");
      updatePageInUrl(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (taskId) => {
    if (!editTaskText) return;
    try {
      await updateTask(taskId, { task: editTaskText });
      const data = await getTasks(currentPage);
      setTasks(data.data.tasks || []);
      setTotalTasks(data.data.totalTasks || 0)
    } catch (error) {
      console.log(error);
    }
    setEditTaskId(null);
    setEditTaskText("");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      const data = await getTasks(currentPage);
      setTasks(data.data.tasks || []);
      setTotalTasks(data.data.totalTasks || 0)
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage * tasksPerPage < totalTasks) {
      updatePageInUrl(nextPage);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      updatePageInUrl(currentPage - 1);
    }
  };  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">My Profile</h1>
      <h2 className="mb-4">My Tasks</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button className="btn btn-primary mt-2" onClick={handleCreateTask}>Add Task</button>
      </div>
      <ul className="list-group mb-3">
        {tasks.map((task) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={task._id}>
            {editTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button onClick={() => handleUpdateTask(task._id)}>Update</button>
                <button onClick={() => { setEditTaskId(null); setEditTaskText(""); }}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.task}</span>
                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => { setEditTaskId(task._id); setEditTaskText(task.task); }}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="btn-group">
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
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
