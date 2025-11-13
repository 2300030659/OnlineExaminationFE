import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "/src/css/Login.css"; // shared CSS

const Login = ({ onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // 🔐 Local Admin Login
      if (formData.email === "admin@gmail.com" && formData.password === "786") {
        alert("✅ Admin Login Successful!");
        localStorage.setItem("userRole", "ADMIN");
        localStorage.setItem("userName", "Admin");
        onClose();
        navigate("/admin-dashboard");
        return;
      }

      // 🌐 API User Login
      const res = await axios.post("http://localhost:8080/api/users/login", formData);

      // Save user info including role from backend
      const user = res.data.user;
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userRole", user.role); 
      localStorage.setItem("token", res.data.token || ""); // in case you later implement JWT

      setSuccess("✅ Login successful!");
      setTimeout(() => {
        onClose();
        if (user.role === "ADMIN") navigate("/admin-dashboard");
        else navigate("/profile");
      }, 800);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.msg || "❌ Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h1 className="title">Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="start-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="subtitle">
          Don’t have an account?{" "}
          <Link
            to="#"
            className="signup-link"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              document.dispatchEvent(new Event("openSignup"));
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
