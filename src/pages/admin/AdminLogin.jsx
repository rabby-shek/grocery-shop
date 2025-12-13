import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", { email, password });
      const { token, userId } = res.data;

      // fetch user details to check admin
      const userRes = await axios.get(`http://localhost:8000/api/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = userRes.data;

      if (!user.isAdmin) {
        setError("You are not authorized as an admin.");
        return;
      }

      // Save token and userId
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminId", userId);

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow-sm p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
