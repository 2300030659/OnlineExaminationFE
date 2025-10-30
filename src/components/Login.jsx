import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "/src/css/Login.css";
import backgroundImage from "/images/New-blog-graphic.jpg"; // 🔥 Import the image

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.email === "admin@gmail.com" && formData.password === "786") {
      alert("Admin Login successful!");
      localStorage.setItem("userName", "Admin");
      navigate("/admin-dashboard");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      alert("Login successful!");
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password");
    }
  };

  return (
    <div
      className="fullscreen-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="title">Login</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="start-button">Login</button>
      </form>
      <p className="subtitle">
        Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
