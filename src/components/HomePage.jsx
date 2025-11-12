import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../css/HomePage.css";
import Login from "./Login";
import SignUp from "./SignUp";

const Navbar = ({ openLogin, openSignup }) => (
  <nav className="navbar">
    <div className="logo">QuizVantage</div>
    <ul className="nav-links">
      <li><Link to="/rewards">Rewards</Link></li>
      <li><Link to="/resources">Resources</Link></li>
      <li><Link to="/faqs">FAQs</Link></li>
      <li><Link to="/blog">Blog</Link></li>
    </ul>
    <div className="auth-buttons">
      <button className="login-button" onClick={openLogin}>Log in</button>
      <button className="signup-button" onClick={openSignup}>Join now</button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-left">
      <span>
        &copy; {new Date().getFullYear()} QuizVantage — Designed and Developed by Syed Mastan Vali
      </span>
      <Link to="/privacy">Privacy</Link>
      <Link to="/terms">Terms</Link>
    </div>
    <div className="footer-right">
      <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
      <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
      <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
    </div>
  </footer>
);

const HomePage = () => {
  const [popup, setPopup] = useState(null);

  // 👇 Event listener for switching Login <-> Signup from inside popups
  useEffect(() => {
    const handleOpenSignup = () => setPopup("signup");
    const handleOpenLogin = () => setPopup("login");

    document.addEventListener("openSignup", handleOpenSignup);
    document.addEventListener("openLogin", handleOpenLogin);

    return () => {
      document.removeEventListener("openSignup", handleOpenSignup);
      document.removeEventListener("openLogin", handleOpenLogin);
    };
  }, []);

  return (
    <div className="fullscreen-container">
      <Navbar
        openLogin={() => setPopup("login")}
        openSignup={() => setPopup("signup")}
      />

      {/* ---------- Hero Section ---------- */}
      <div className="hero-section">
        <div className="hero-text">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Unlock Exclusive <br /> Rewards as <span className="highlight">You Win</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Dive into the ultimate quiz experience — a blend of excitement, learning, and triumph.
          </motion.p>

          <button className="start-solving" onClick={() => setPopup("signup")}>
            Start solving
          </button>
        </div>
      </div>

      {/* ---------- Features ---------- */}
      <div className="features-section">
        <div className="feature-card">
          <h3>3D Coverage</h3>
          <p>Comprehensive topic coverage with multi-level difficulty.</p>
        </div>
        <div className="feature-card">
          <h3>Wide Subject Range</h3>
          <p>Choose from languages, engineering, and aptitude quizzes.</p>
        </div>
        <div className="feature-card">
          <h3>Detailed Solutions</h3>
          <p>Understand every answer with step-by-step explanations.</p>
        </div>
        <div className="feature-card">
          <h3>Leaderboard</h3>
          <p>Track your rank and compete with other quiz enthusiasts.</p>
        </div>
      </div>

      <Footer />

      {/* ---------- Popups ---------- */}
      {popup === "login" && <Login onClose={() => setPopup(null)} />}
      {popup === "signup" && <SignUp onClose={() => setPopup(null)} />}
    </div>
  );
};

export default HomePage;
