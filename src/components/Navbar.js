import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleReset = () => {
    navigate("/");
  };

  return (
    <nav
      style={{
        padding: "1px",
        backgroundColor: "#007bff",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div style={{ marginTop: "10px" }}>Hello, {user?.name}</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
