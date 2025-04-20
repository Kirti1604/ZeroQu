import React from "react";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar user={user} />
      <div style={{ padding: "20px" }}>
        <h1>Welcome Admin 👑</h1>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={boxStyle}>Good Morning!</div>
          <div style={boxStyle}>Today's Task: Review Reports</div>
          <div style={boxStyle}>New Users: 5</div>
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

export default AdminDashboard;
