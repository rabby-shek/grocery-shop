import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="bg-success text-white p-3" style={{ width: "250px" }}>
      <h3 className="text-center mb-4">Admin Panel</h3>
      <ul className="nav flex-column">
        <li className="nav-item mb-2 bg-dark">
          <Link className="nav-link text-white" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item mb-2 bg-dark">
          <Link className="nav-link text-white" to="/admin/users">
            Users
          </Link>
        </li>
        <li className="nav-item mb-2 bg-dark">
          <Link className="nav-link text-white" to="/admin/categories">
            Categories
          </Link>
        </li>
        <li className="nav-item mb-2 bg-dark">
          <Link className="nav-link text-white" to="/admin/products">
            Products
          </Link>
        </li>
        <li className="nav-item mb-2 bg-dark">
          <Link className="nav-link text-white" to="/admin-settings">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
