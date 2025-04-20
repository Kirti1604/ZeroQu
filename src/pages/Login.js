import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Popup states
  const [showPopup, setShowPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password)
      return setError("Please enter email and password.");
    if (!validateEmail(email)) return setError("Invalid email format.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");

    try {
      // Sending request to login API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("API Response:", res.data); // Log the full API response

      const { user, token } = res.data;

      if (!user || !token) {
        setError("Invalid login credentials.");
        return;
      }

      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Log the role and check
      console.log("User Role:", user.role); // Log user role

      // Role-based redirection
        if (user.role === 1) {
          console.log("Redirecting to /admin");
          navigate("/admin");
        } else if (user.role === 2) {
          console.log("Redirecting to /user");
          navigate("/user");
        } else {
          setError("Unknown role.");
        }

    } catch (err) {
      // Error handling
      setError(err.response?.data?.msg || "Login failed.");
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetMessage("");

    if (!validateEmail(resetEmail)) {
      return setResetMessage("Please enter a valid email.");
    }
    if (newPassword.length < 6) {
      return setResetMessage("Password must be at least 6 characters.");
    }

    setResetMessage("This feature will be implemented with backend.");
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

          {/* Forget Password Link */}
          <div
            className="forget-password"
            style={{ textAlign: "right", marginBottom: "10px" }}
          >
            <button
              type="button"
              onClick={() => setShowPopup(true)}
              style={{
                fontSize: "0.9rem",
                color: "#007bff",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit">Sign in</button>
        </form>
      </div>

      {/* Forgot Password Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Reset Password</h3>
            <form onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {resetMessage && <p>{resetMessage}</p>}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button type="submit">Reset</button>
                <button type="button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
