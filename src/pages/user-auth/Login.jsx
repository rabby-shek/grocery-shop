import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ LOGIN
      const loginRes = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password }
      );

      const { token, userId, isAdmin } = loginRes.data;

      // 2️⃣ GET USER DATA
      const userRes = await axios.get(
        `http://localhost:8000/api/auth/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3️⃣ SAVE EVERYTHING IN LOCALSTORAGE
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("user", JSON.stringify(userRes.data));

      // 4️⃣ REDIRECT
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-3">User Login</h3>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          className="btn btn-dark w-100 mt-2"
          onClick={() => navigate("/user/auth/registration")}
        >
          Don&apos;t have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;
