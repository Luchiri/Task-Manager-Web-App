import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //replace with API call
    setTimeout(() => {
      setLoading(false);
      onLogin({ name: email.split("@")[0], email });
      toast.success("Logged in as " + email);
      navigate("/tasks");
    }, 700);
  };

  const handleGoogleLogin = () => {
    //Replace with Google OAuth login
    const googleFakeEmail = "kate@gmail.com";
    onLogin({ name: "Google User", email: googleFakeEmail });
    toast.success("Logged in with Google");
    navigate("/tasks");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="mb-4 text-center">Sign In</h3>
            <button
              type="button"
              className="btn btn-outline-danger w-100 mb-3"
              onClick={handleGoogleLogin}
            >
              <i className="bi bi-google me-2"></i> Continue with Google
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kate@gmail.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
