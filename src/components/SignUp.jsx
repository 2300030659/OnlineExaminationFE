import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "/src/css/Login.css"; // same CSS for both Login & Signup popups

const SignUp = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/users/signup", formData);
      setSuccess("✅ Registration successful! You can now log in.");
      setTimeout(() => {
        onClose();
        document.dispatchEvent(new Event("openLogin")); // auto open login
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.msg || "❌ Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h1 className="title">Sign Up</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="start-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="subtitle">
          Already have an account?{" "}
          <Link
            to="#"
            className="signup-link"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              document.dispatchEvent(new Event("openLogin"));
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
