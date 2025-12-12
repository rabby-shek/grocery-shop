import React from "react";

const Header = () => {
  return (
    <header className="bg-dark p-3 shadow-sm d-flex justify-content-between align-items-center">
      <h5 className="mb-0 text-white">Admin Dashboard</h5>
      <div>
        <button className="btn btn-outline-danger btn-sm">Logout</button>
      </div>
    </header>
  );
};

export default Header;
