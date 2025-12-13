import React, { useState } from "react";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState("login"); // "login" or "verify"
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        email,
        password,
      });

      const { token, userId, isAdmin } = res.data;

      if (!isAdmin) {
        setError("You are not an admin.");
        return;
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminId", userId);

      alert("Login successful! Redirecting to dashboard...");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed.";
      if (msg === "Verify OTP first") {
        const res = await axios.post("http://localhost:8000/api/auth/resend-otp", { email });
        setUserId(res.data.userId);
        setStep("verify");
      } else {
        setError(msg);
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:8000/api/auth/verify-otp", {
        userId,
        otp,
      });
      alert("OTP verified! Please login again.");
      setStep("login");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow-sm p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">
          {step === "login" ? "User Login" : "Verify OTP"}
        </h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {step === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
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
              <label htmlFor="password" className="form-label">Password</label>
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

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input
                type="text"
                id="otp"
                className="form-control"
                placeholder="Enter OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">Verify OTP</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
