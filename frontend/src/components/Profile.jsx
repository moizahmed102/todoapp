import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { createTask, updateTask, deleteTask, getTasks } from "../services/taskService";

function Profile() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "0", 10);
  const tasksPerPage = 4;

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getTasks(currentPage);
        setTasks(data.data.paginatedTasks);
        setTotalTasks(data.data.totalTasks);
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
      updatePageInUrl(0); 
    } catch (error) {
      console.log(error);
    }
    setNewTask("");
  };

  const handleUpdateTask = async (taskId) => {
    if (!editTaskText) return;
    try {
      await updateTask(taskId, { task: editTaskText });
      const data = await getTasks(currentPage);
      setTasks(data.data.paginatedTasks);
      setTotalTasks(data.data.totalTasks);
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
      setTasks(data.data.paginatedTasks);
      setTotalTasks(data.data.totalTasks);
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

  return (
    <div>
      <h1>My Profile</h1>
      <h2>My Tasks</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
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
                <button onClick={() => { setEditTaskId(task._id); setEditTaskText(task.task); }}>Edit</button>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={(currentPage + 1) * tasksPerPage >= totalTasks}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Profile;
