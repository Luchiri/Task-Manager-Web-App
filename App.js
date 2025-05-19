import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
import TaskDetails from "./pages/TaskDetails";
import TeamList from "./pages/TeamList";
import TeamForm from "./pages/TeamForm";
import Dashboard from "./pages/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: Date.now(), comments: [] }]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleCommentAdded = (taskId, newComment) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, comments: [newComment, ...(task.comments || [])] } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully!");
  };

  const handleLogin = (userData) => {
    setUser(userData);
    toast.success("Login successful!");
  };

  const handleLogout = () => {
    setUser(null);
    toast.info("Logged out.");
  };

  const TaskDetailsContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = tasks ? tasks.find((t) => String(t.id) === id) : null;

    if (!task) {
      return (
        <div className="container mt-4">
          <div className="mb-3">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/tasks")}>
              <i className="bi bi-arrow-left me-1"></i> Back to Tasks
            </button>
          </div>
          <div className="alert alert-danger">Task not found.</div>
        </div>
      );
    }

    return (
      <TaskDetails
        user={user}
        tasks={tasks}
        onCommentAdded={(newComment) => handleCommentAdded(task.id, newComment)}
      />
    );
  };

  const TaskFormWrapper = () => {
    return <TaskForm onTaskSave={(taskData) => {
      if (taskData.id) {
        handleUpdateTask(taskData);
      } else {
        handleAddTask(taskData);
      }
    }} />;
  };

  return (
    <Router>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <Navbar user={user} onLogout={handleLogout} />

        <div className="flex-grow-1 p-4">
          <ToastContainer position="top-center" autoClose={2000} />
          <Routes>
            <Route
              path="/login"
              element={
                user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
              }
            />
            <Route
              path="/register"
              element={
                user ? <Navigate to="/dashboard" /> : <Register onRegister={handleLogin} />
              }
            />
            <Route
              path="/tasks"
              element={user ? <TaskList user={user} tasks={tasks} onDeleteTask={handleDeleteTask} /> : <Navigate to="/login" />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks/new"
              element={user ? <TaskFormWrapper /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks/:id"
              element={user ? <TaskDetailsContainer /> : <Navigate to="/login" />}
            />
            <Route
              path="/tasks/edit/:id"
              element={user ? <TaskFormWrapper /> : <Navigate to="/login" />}
            />
            <Route
              path="/teams"
              element={user ? <TeamList user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/teams/new"
              element={user ? <TeamForm user={user} /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;