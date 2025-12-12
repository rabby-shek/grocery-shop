import React from "react";

const Header = () => {
  return (
    <header className="bg-success p-3 shadow-sm d-flex justify-content-between align-items-center">
      <h5 className="mb-0 text-white">Welcome to admin panel</h5>
      <div>
        <button className="btn btn-outline-light btn-sm">Logout</button>
      </div>
    </header>
  );
};

export default Header;
