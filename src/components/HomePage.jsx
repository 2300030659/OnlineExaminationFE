import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "/src/css/HomePage.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">QuizVantage</div>
      <ul className="nav-links">
        <li><Link to="/rewards">Rewards</Link></li>
        <li><Link to="/resources">Resources</Link></li>
        <li><Link to="/faqs">FAQs</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
      <div className="auth-buttons">
        <button className="login-button" onClick={handleLoginClick}>Log in</button>
        <Link to="/signup" className="signup-button">Join now</Link>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span>&copy; {new Date().getFullYear()} QuizVantage Designed and Developed by Syed Mastan Vali  
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
};

const HomePage = () => {
  const navigate = useNavigate(); // <-- Add this line

  const handleStartSolvingClick = () => {
    navigate("/signup"); // Redirect to signup page
  };

  return (
    <div className="fullscreen-container">
      <Navbar />
      <div className="hero-section">
        <div className="hero-text">
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            Unlock Exclusive <br /> Rewards as <span className="highlight">You Win</span>
          </motion.h1>
          <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            Dive into the ultimate quiz experience – a blend of excitement, learning, and triumph. Quizzes, it's more than a game.
          </motion.p>
          <button className="start-solving" onClick={handleStartSolvingClick}>Start solving</button>
        </div>
        <motion.img 
          src="/images/4415.png" 
          alt="Quiz Reward" 
          className="hero-image"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>3D Coverage</h3>
          <p>3 dimensional coverage of all questions related to a particular topic</p>
        </div>
        <div className="feature-card">
          <h3>Plenty of subjects</h3>
          <p>Plenty of subjects to choose from e.g. Computer languages, Engineering subjects etc.</p>
        </div>
        <div className="feature-card">
          <h3>Detailed solutions</h3>
          <p>Detailed explanation of a solution is provided to get deeper understanding of a topic</p>
        </div>
        <div className="feature-card">
          <h3>Earth of subjects</h3>
          <p>Plenty of subjects to choose from e.g. Computer languages, Engineering subjects etc.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage; 