import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "/src/css/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  
  // Get user data (assuming token contains user info in localStorage)
  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/", { replace: true }); // Redirect to homepage after logout
  };

  // ✅ Updated quiz data for CI/CD and DevOps
  const quizzes = [
    { id: 1, name: "Git & GitHub", description: "Assess your knowledge of version control, branching, and collaborative workflows using Git and GitHub." },
    { id: 2, name: "Jenkins CI/CD", description: "Test your understanding of Jenkins pipelines, automation, and continuous integration concepts." },
    { id: 3, name: "Docker & Containers", description: "Explore questions about containerization, Dockerfiles, and container orchestration basics." },
    { id: 4, name: "Kubernetes", description: "Challenge yourself on Kubernetes architecture, pods, deployments, and service management." },
    { id: 5, name: "DevOps Fundamentals", description: "A comprehensive quiz covering CI/CD pipelines, infrastructure as code, monitoring, and automation practices." }
  ];

  return (
    <div
      className="dashboard-container"
      style={{
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <nav className="navbar">
        <h2 className="logo">Quiz Vantage</h2>

        <ul className="nav-links">
          <li><Link to="/quizzes">Quizzes</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>

        <div className="user-info">
          <span className="user-name">Welcome, {userName}!</span>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h1>DevOps Dashboard</h1>
        <p>Enhance your CI/CD and DevOps skills by taking these quizzes!</p>
        <button 
          className="start-quiz-button" 
          onClick={() => navigate("/quiz-details")}
        >
          Take a Quiz
        </button>
        
        <div className="quizzes-list">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="quiz-box"
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <h3>{quiz.name}</h3>
              <p>{quiz.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
