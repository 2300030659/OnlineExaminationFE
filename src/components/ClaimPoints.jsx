import React, { useState } from 'react';
import axios from 'axios';

const ClaimPoints = () => {
  const [marks, setMarks] = useState('');
  const [points, setPoints] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = "12345"; // Replace this with dynamic user ID logic if available

  const handleClaimPoints = async () => {
    setError(null);
    setClaimed(false);

    // Basic validation
    if (!marks || !points || Number(marks) <= 0 || Number(points) <= 0) {
      setError("Please enter valid marks and points greater than zero.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/claim", {
        marks: Number(marks),
        points: Number(points),
        userId: userId
      });

      if (response.status === 200) {
        setClaimed(true);
      }
    } catch (err) {
      if (err.response) {
        setError(`Server Error: ${err.response.data.message || "Unknown error"}`);
      } else if (err.request) {
        setError("No response from the server. Check your network.");
      } else {
        setError("Failed to claim points. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Claim Your Points</h2>

      <label style={styles.label}>Marks:</label>
      <input
        type="number"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>Points:</label>
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        style={styles.input}
      />

      {error && <p style={styles.error}>{error}</p>}
      {claimed && <p style={styles.success}>🎉 Points claimed successfully!</p>}

      <button onClick={handleClaimPoints} style={styles.button} disabled={loading}>
        {loading ? "Claiming..." : "Claim Points"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    marginTop: '15px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    marginTop: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginTop: '10px'
  },
  success: {
    color: 'green',
    marginTop: '10px'
  }
};

export default ClaimPoints;
