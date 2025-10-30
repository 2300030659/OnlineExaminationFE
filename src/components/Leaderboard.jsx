// src/components/Leaderboard.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "/src/css/Leaderboard.css";

const Leaderboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract current user and score from the location state or use defaults
  const currentUser = location.state?.username || "You";
  const currentScore = location.state?.score || Math.floor(Math.random() * 11); // Random score between 0-10

  // Sample leaderboard data
  const initialData = [
    { name: "Alice", score: 9 },
    { name: "Bob", score: 8 },
    { name: "Charlie", score: 7 },
    { name: "Diana", score: 6 },
    { name: "Eve", score: 5 },
    { name: "Frank", score: 4 },
  ];

  // Add current user to leaderboard and sort by score
  const updatedData = [...initialData, { name: currentUser, score: currentScore }];
  const sortedData = updatedData.sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <ul>
        {sortedData.map((entry, index) => (
          <li key={index} className={entry.name === currentUser ? "current-user" : ""}>
            <span className="rank">#{index + 1}</span>
            <span className="username">{entry.name}</span>
            <span className="score">{entry.score} / 10</span>
          </li>
        ))}
      </ul>
      <button className="back-button" onClick={() => navigate("/profile")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Leaderboard;
