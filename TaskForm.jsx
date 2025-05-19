import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const teams = ["DevOps", "Frontend", "Backend", "FullStack", "Design"];
const users = ["Catherine Luchiri", "Patricia Akumu", "Lincoln Lime", "Austins Kimani", "Chadwick Kiplasoi"];
const priorities = ["High", "Medium", "Low"];
const statuses = ["To Do", "In Progress", "Completed"];

const TaskForm = ({ onTaskSave }) => {
  const { id: taskIdToEdit } = useParams();
  const navigate = useNavigate();
  const [initialTask, setInitialTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState(users[0]);
  const [team, setTeam] = useState(teams[0]);
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState(priorities[1]);
  const [completed, setCompleted] = useState(false); // Initialize with boolean
  const [status, setStatus] = useState(statuses[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskIdToEdit) {
      const storedTasks = localStorage.getItem("tasks");
      const taskToEdit = storedTasks ? JSON.parse(storedTasks).find(t => t.id === parseInt(taskIdToEdit)) : null;
      if (taskToEdit) {
        setInitialTask(taskToEdit);
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setAssignedTo(taskToEdit.assignedTo);
        setTeam(taskToEdit.team);
        setDeadline(taskToEdit.deadline);
        setPriority(taskToEdit.priority);
        setCompleted(taskToEdit.completed);
        setStatus(taskToEdit.status || statuses[0]); 
      } else {
        toast.error("Task not found for editing.");
        navigate("/tasks");
      }
    } else {
      setStatus(statuses[0]); 
    }
  }, [taskIdToEdit, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const taskData = {
      title,
      description,
      assignedTo,
      team,
      deadline,
      priority,
      completed,
      status,
      id: initialTask?.id,
      comments: initialTask?.comments || [],
    };

    setTimeout(() => {
      setLoading(false);
      toast.success(`Task ${initialTask ? "updated" : "created"}!`);
      onTaskSave(taskData);
      navigate("/tasks");
    }, 800);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-info rounded-lg">
            <div className="card-header bg-info text-white py-3">
              <h4 className="card-title mb-0 fw-bold text-center">
                {initialTask ? "Edit Task" : "Create New Task"}
              </h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label fw-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">
                    Description
                  </label>
                  <textarea
                    className="form-control form-control-lg"
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="assignTo"
                      className="form-label fw-semibold"
                    >
                      Assign To
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="assignTo"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                    >
                      {users.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="team" className="form-label fw-semibold">
                      Team
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="team"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                    >
                      {teams.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label
                      htmlFor="priority"
                      className="form-label fw-semibold"
                    >
                      Priority
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="priority"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      {priorities.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="status" className="form-label fw-semibold">
                      Status
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="deadline" className="form-label fw-semibold">
                    Deadline
                  </label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    id="deadline"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input form-check-input-lg"
                    id="completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                  <label className="form-check-label fw-semibold" htmlFor="completed">
                    Completed
                  </label>
                </div>
                <div className="d-flex justify-content-end gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => navigate("/tasks")}
                  >
                    <i className="bi bi-x-circle me-1"></i> Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className="bi bi-check-circle me-1"></i>
                    )}
                    {loading
                      ? initialTask
                        ? "Updating..."
                        : "Creating..."
                      : initialTask
                      ? "Update Task"
                      : "Create Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;