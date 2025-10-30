// Blog.jsx
import React from "react";
import "../css/Blog.css";

const Blog = () => {
  return (
    <div className="blog-container">
      <h1 className="blog-title">QuizVantage Blog</h1>
      <p className="blog-intro">Stay updated with the latest in quiz competitions, platform features, and learning tips!</p>

      <div className="blog-post">
        <h2>🚀 Mastering Online Quizzes: Tips to Win Big!</h2>
        <p>Online quizzes are more than fun—they’re a path to learning and rewards. Stay consistent, understand the format, and explore our solution guides to boost your performance.</p>
      </div>

      <div className="blog-post">
        <h2>🧠 Why QuizVantage is Perfect for Students</h2>
        <p>QuizVantage offers multi-subject coverage, instant feedback, and a fun way to challenge yourself. Whether you're into coding, math, or general knowledge—we've got you covered!</p>
      </div>

      <div className="blog-post">
        <h2>🌟 Leaderboards & Rewards: How it Works</h2>
        <p>Compete with others, see where you stand, and earn digital rewards or certificates. Top scorers are also featured weekly!</p>
      </div>
    </div>
  );
};

export default Blog;
