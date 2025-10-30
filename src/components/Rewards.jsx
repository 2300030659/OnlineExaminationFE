import React, { useState } from "react";
import axios from "axios";
import "../css/Rewards.css";

const Rewards = () => {
  const [marks, setMarks] = useState(0);
  const [points, setPoints] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState("");

  const calculatePoints = (score) => {
    return score * 10;
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setMarks(value);
    setPoints(calculatePoints(value));
    setClaimed(false);
    setError("");
  };

  const handleClaimPoints = async () => {
    try {
      // Replace with your actual backend API endpoint
      const response = await axios.post("http://localhost:5000/api/claim", {
        marks: marks,
        points: points,
        userId: "12345" // Replace with actual user ID if available via auth
      });
      if (response.status === 200) {
        setClaimed(true);
      }
    } catch (err) {
      setError("Failed to claim points. Try again later.");
    }
  };

  return (
    <div className="rewards-container">
      <h2 className="rewards-title">Rewards</h2>
      <p className="rewards-description">
        Enter your quiz marks to see your reward points!
      </p>

      <div className="rewards-form">
        <label htmlFor="marks">Marks Obtained:</label>
        <input
          type="number"
          id="marks"
          value={marks}
          onChange={handleInputChange}
          placeholder="Enter your marks"
        />
      </div>

      <div className="reward-result">
        <p>You have earned: <span className="reward-points">{points} points</span></p>
        <button className="claim-button" onClick={handleClaimPoints} disabled={claimed || points === 0}>
          {claimed ? "Points Claimed ✅" : "Claim Points"}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Rewards;
