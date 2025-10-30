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
    navigate("/login"); // Redirect to login after logout
  };

  // Dummy quiz data (you can replace this with real API data)
  const quizzes = [
  { id: 1, name: "MongoDB", description: "Test your knowledge on MongoDB, the NoSQL database." },
  { id: 2, name: "Node.js", description: "Explore server-side JavaScript with Node.js quizzes." },
  { id: 3, name: "Express", description: "Questions covering Express framework concepts and usage." },
  { id: 4, name: "React", description: "Challenge your React knowledge, from basics to hooks and components." },
  { id: 5, name: "MERN Stack", description: "A comprehensive quiz on MongoDB, Express, React, and Node.js integration." }
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
        <h1>Dashboard</h1>
        <p>Start your quiz journey today!</p>
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
