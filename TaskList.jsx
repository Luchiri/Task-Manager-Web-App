import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TaskList = ({ user, tasks, onDeleteTask }) => {
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("deadline");
  const navigate = useNavigate();

  const handleDelete = (id) => {
    onDeleteTask(id); 
  };

  const filtered =
    priorityFilter === "All"
      ? tasks
      : tasks.filter((t) => t.priority === priorityFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "deadline") {
      return a.deadline.localeCompare(b.deadline);
    }
    if (sortBy === "priority") {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    }
    return 0;
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">Task Overview</h2>
        <Link to="/tasks/new" className="btn btn-success btn-lg">
          <i className="bi bi-plus-circle me-2"></i> New Task
        </Link>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="priorityFilter" className="form-label fw-semibold">
            Filter by Priority:
          </label>
          <select
            className="form-select form-select-lg"
            id="priorityFilter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            {["All", "High", "Medium", "Low"].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="sortBy" className="form-label fw-semibold">
            Sort By:
          </label>
          <select
            className="form-select form-select-lg"
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover align-middle shadow-sm">
          <thead className="table-info">
            <tr>
              <th>Title</th>
              <th>Team</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No tasks found.
                </td>
              </tr>
            ) : (
              sorted.map((task) => (
                <tr key={task.id} className={task.completed ? "table-success" : ""}>
                  <td>
                    <Link to={`/tasks/${task.id}`} className="fw-bold text-decoration-none text-dark">
                      {task.title}
                    </Link>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{task.team}</span>
                  </td>
                  <td>
                    <i className="bi bi-people-fill me-1"></i>
                    {Array.isArray(task.assignedTo) ? task.assignedTo.join(", ") : task.assignedTo}
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill ${
                        task.priority === "High"
                          ? "bg-danger"
                          : task.priority === "Medium"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>
                    <i className="bi bi-calendar-event me-1"></i> {task.deadline}
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill ms-0 ${
                        task.status === "Completed"
                          ? "bg-success"
                          : task.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-info"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <i className="bi bi-chat-dots-fill me-1"></i>
                    {task.comments ? task.comments.length : 0}
                  </td>
                  <td>
                    <Link
                      to={`/tasks/${task.id}`}
                      className="btn btn-sm btn-outline-primary me-1"
                    >
                      <i className="bi bi-eye-fill me-1"></i> View
                    </Link>
                    <Link
                      to={`/tasks/edit/${task.id}`}
                      className="btn btn-sm btn-outline-secondary me-1"
                    >
                      <i className="bi bi-pencil-square-fill me-1"></i> Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      <i className="bi bi-trash-fill me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;