import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column bg-primary text-white p-3"
      style={{ minHeight: "100vh", width: "220px" }}
    >
      <h4 className="text-white mb-4 text-center">Task Manager</h4>


      <ul className="nav nav-pills flex-column mt-3">
        {user ? (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/dashboard">
                <i className="bi bi-speedometer2 me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/tasks">
                <i className="bi bi-list-task me-2"></i> Tasks
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/teams">
                <i className="bi bi-people me-2"></i> Teams
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/login">
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/register">
                <i className="bi bi-person-plus me-2"></i> Register
              </Link>
            </li>
          </>
        )}
      </ul>

      {user && (
        <div className="mt-auto text-center">
          <div className="mb-2">
            <i className="bi bi-person-circle"></i>
            <div>{user.name || user.email}</div>
          </div>
          <button className="btn btn-light btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
