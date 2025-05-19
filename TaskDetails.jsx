import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import TaskComments from "../components/TaskComments";

const TaskDetails = ({ user, tasks, onCommentAdded }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks ? tasks.find((t) => String(t.id) === String(id)) : null;

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
    <div className="container mt-4">
      <div className="mb-3">
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/tasks")}>
          <i className="bi bi-arrow-left me-1"></i> Back to Tasks
        </button>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="mb-0">{task.title}</h3>
                <Link
                  to={`/tasks/edit/${task.id}`}
                  className="btn btn-outline-primary btn-sm"
                >
                  <i className="bi bi-pencil-square me-1"></i> Edit
                </Link>
              </div>
              <div className="mb-2">
                <span className="badge bg-info me-2">
                  <i className="bi bi-tag me-1"></i> {task.team}
                </span>
                <span
                  className={`badge rounded-pill ${
                    task.priority === "High"
                      ? "bg-danger"
                      : task.priority === "Medium"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  } me-2`}
                >
                  {task.priority} Priority
                </span>
                <span className="text-muted ms-2">
                  <i className="bi bi-person-fill me-1"></i>
                  {Array.isArray(task.assignedTo)
                    ? task.assignedTo.join(", ")
                    : task.assignedTo}
                </span>
                <span className="text-muted ms-3">
                  <i className="bi bi-chat-dots-fill me-1"></i>
                  {task.comments ? task.comments.length : 0} Comment(s)
                </span>
              </div>
              <div className="mb-3">
                <small className="text-muted">
                  <i className="bi bi-calendar-event me-1"></i> Deadline:{" "}
                  {task.deadline}
                </small>
                <br />
                <span
                  className={`badge rounded-pill ms-0 ${
                    task.status === "Completed"
                      ? "bg-success"
                      : task.status === "In Progress"
                      ? "bg-warning text-dark"
                      : "bg-info" // Assuming "To Do" or default
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="mb-3">
                <h6 className="fw-semibold">Description:</h6>
                <p className="text-secondary">{task.description}</p>
              </div>
            </div>
          </div>
          <TaskComments
            taskId={task.id}
            user={user}
            initialComments={task.comments}
            onCommentAdded={onCommentAdded}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;