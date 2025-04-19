import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import users from "../data/users";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle state
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password)
      return setError("Please enter email and password.");
    if (!validateEmail(email)) return setError("Invalid email format.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate(`/${user.role}`);
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: 'url("/assets/login-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: "100px",
      }}
    >
      <div className="login-box">
        <h2>ZEROQU</h2>
        <h6>Vessel Performance Monitoring</h6>
        <h4>Log in to your account</h4>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
