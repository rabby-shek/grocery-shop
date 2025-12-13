import React from "react";
import useAdminAuth from "../../hooks/useAdminAuth";
const Header = () => {
   const { logout } = useAdminAuth();
  return (
    <header className="bg-success p-3 shadow-sm d-flex justify-content-between align-items-center">
      <h5 className="mb-0 text-white">Welcome to admin panel</h5>
      <div>
        <button className="btn btn-outline-light btn-sm"  onClick={logout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
