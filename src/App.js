import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin"
        element={
          user ? (
            user.role === 1 ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/user"
        element={
          user ? (
            user.role === 2 ? (
              <UserDashboard />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default App;
