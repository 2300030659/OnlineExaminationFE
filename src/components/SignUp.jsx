import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", formData);
      alert(res.data.msg);
      navigate("/login"); // Redirect to login page after successful signup
    } catch (err) {
      alert(err.response.data.msg || "Error signing up");
    }
  };

  return (
    <div
  className="fullscreen-container"
  style={{
    height: "100vh",
    backgroundImage: "url('/images/depositphotos_138030202-stock-photo-physics-concept-on-background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <h1 className="title">Sign Up</h1>
  <form className="signup-form" onSubmit={handleSubmit}>
    <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
    <button type="submit" className="start-button">Sign Up</button>
  </form>
  <p className="subtitle">
    Already have an account? <Link to="/login" className="login-link">Login</Link>
  </p>
</div>

  );
};

export default SignUp;