import React from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/QuizDetails.css";

const QuizDetails = () => {
  const navigate = useNavigate();

  const quiz = {
    name: "Simple Quiz On Mern Stack Development",
    description:
      "Test your knowledge across various concepts including , react , mongodb and node !",
    totalQuestions: 10,
    duration: "10 minutes",
  };

  const handleStartQuiz = () => {
    const userConfirmed = window.confirm(
      "⚠️ Please Note:\n\nOnce the quiz starts:\n- The timer will begin immediately.\n- You cannot pause the quiz.\n- Make sure you're ready before proceeding.\n\nDo you want to start the quiz now?"
    );

    if (userConfirmed) {
      navigate("/quiz/start");
    }
  };

  return (
    <div className="quiz-details-container">
      <div className="quiz-card">
        <h1 className="quiz-title">{quiz.name}</h1>
        <p className="quiz-description">{quiz.description}</p>
        <div className="quiz-info">
          <p><strong>📝 Total Questions:</strong> {quiz.totalQuestions}</p>
          <p><strong>⏱️ Duration:</strong> {quiz.duration}</p>
        </div>
        <button
          className="start-quiz-button"
          onClick={handleStartQuiz}
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
