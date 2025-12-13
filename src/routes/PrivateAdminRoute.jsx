import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Checks if admin is authenticated
const PrivateAdminRoute = () => {
  const token = localStorage.getItem("adminToken"); // admin token stored at login

  if (!token) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/auth" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default PrivateAdminRoute;
