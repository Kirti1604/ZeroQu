import React from "react";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar user={user} />
      <div style={{ padding: "20px" }}>
        <h1>Welcome User 👋</h1>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={boxStyle}>Hello! Have a great day!</div>
          <div style={boxStyle}>Pending Tasks: 2</div>
          <div style={boxStyle}>Recent Activity: Logged in</div>
        </div>
      </div>
    </>
  );
};

const boxStyle = {
  background: "#f0f0f0",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  flex: "1",
};

export default UserDashboard;
