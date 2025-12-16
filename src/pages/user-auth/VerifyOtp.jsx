import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RESEND_TIME = 120; // 2 minutes in seconds

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIME);

  const userId = localStorage.getItem("otpUserId");
  const email = localStorage.getItem("otpEmail");

  // redirect if no user
  // useEffect(() => {
  //   if (!userId) {
  //     navigate("user/auth/registration");
  //   }
  // }, [userId, navigate]);

  // countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("OTP is required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:8000/api/auth/verify-otp", {
        userId,
        otp,
      });

      localStorage.removeItem("otpUserId");
      localStorage.removeItem("otpEmail");

      alert("Account verified successfully");
      navigate("/user/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setError("");

    try {
      await axios.post("http://localhost:8000/api/auth/resend-otp", {
        email,
      });

      alert("New OTP sent to your email");
      setTimer(RESEND_TIME); // restart timer
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "360px" }}>
        <h3 className="text-center mb-3">Verify OTP</h3>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-3">
            <label className="form-label">OTP Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-3">
          {timer > 0 ? (
            <small className="text-muted">
              Resend OTP in <strong>{formatTime(timer)}</strong>
            </small>
          ) : (
            <button
              className="btn btn-link p-0"
              onClick={resendOtp}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
