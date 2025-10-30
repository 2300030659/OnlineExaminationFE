import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "/src/css/QuizResult.css";

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0;
  const userAnswers = location.state?.userAnswers || [];

  return (
    <div className="result-container">
      <h1 className="result-title">Quiz Completed!</h1>
      <p className="score">Your Score: <strong>{score}</strong> / {userAnswers.length}</p>

      <div className="summary">
        <h2 className="summary-title">Answer Summary</h2>
        {userAnswers.map((entry, index) => {
          const isCorrect = entry.selected === entry.correct;
          return (
            <div key={index} className="question-card">
              <h3 className="question">Q{index + 1}: {entry.question}</h3>
              <p className={`answer-text ${isCorrect ? "correct-answer" : "wrong-answer"}`}>
                Your Answer: {entry.selected}
              </p>
              {!isCorrect && (
                <p className="answer-text correct-answer">
                  Correct Answer: {entry.correct}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="button-group">
        <button className="back-button" onClick={() => navigate("/profile")}>
          Back to Dashboard
        </button>
        <button
  className="back-button"
  onClick={() => navigate("/leaderboard", { state: { score, username: "You" } })}
>
  View Leaderboard
</button>

      </div>
    </div>
  );
};

export default QuizResult;
