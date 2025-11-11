import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/QuizPage.css";

const quizData = [
  {
    question: "What does CI/CD stand for?",
    options: [
      "Continuous Integration and Continuous Deployment",
      "Code Integration and Code Delivery",
      "Continuous Implementation and Continuous Delivery",
      "Central Integration and Central Deployment",
    ],
    correct: "Continuous Integration and Continuous Deployment",
  },
  {
    question: "Which tool is primarily used for Continuous Integration?",
    options: ["Jenkins", "Docker", "Kubernetes", "Git"],
    correct: "Jenkins",
  },
  {
    question: "In DevOps, Infrastructure as Code (IaC) refers to:",
    options: [
      "Manually configuring infrastructure",
      "Automating infrastructure setup using code",
      "Using Excel sheets for configuration",
      "Documenting infrastructure manually",
    ],
    correct: "Automating infrastructure setup using code",
  },
  {
    question: "Which of the following is a containerization platform?",
    options: ["Docker", "Jenkins", "Ansible", "Terraform"],
    correct: "Docker",
  },
  {
    question: "What is the main purpose of a pipeline in CI/CD?",
    options: [
      "To automate the process of building, testing, and deploying code",
      "To store source code",
      "To monitor network traffic",
      "To host databases",
    ],
    correct: "To automate the process of building, testing, and deploying code",
  },
  {
    question: "Which tool is commonly used for container orchestration?",
    options: ["Kubernetes", "GitHub", "Prometheus", "Maven"],
    correct: "Kubernetes",
  },
  {
    question: "Which configuration management tool is agentless?",
    options: ["Ansible", "Chef", "Puppet", "SaltStack"],
    correct: "Ansible",
  },
  {
    question: "What is the primary goal of DevOps?",
    options: [
      "To improve collaboration between development and operations teams",
      "To replace developers with automation",
      "To eliminate testing",
      "To reduce infrastructure costs only",
    ],
    correct: "To improve collaboration between development and operations teams",
  },
  {
    question: "Which of the following best describes a rolling deployment?",
    options: [
      "Deploying new versions to all servers simultaneously",
      "Gradually replacing old instances with new ones",
      "Deploying only during weekends",
      "Completely shutting down old systems before deploying new ones",
    ],
    correct: "Gradually replacing old instances with new ones",
  },
  {
    question: "Which tool is used for monitoring in DevOps?",
    options: ["Prometheus", "Docker", "GitLab", "NPM"],
    correct: "Prometheus",
  },
];

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(720);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          navigate("/quiz/result", { state: { score, userAnswers } });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [score, userAnswers, navigate]);

  const handleAnswer = () => {
    const currentQ = quizData[currentQuestion];
    const isCorrect = selectedOption === currentQ.correct;

    const updatedAnswers = [
      ...userAnswers,
      {
        question: currentQ.question,
        selected: selectedOption,
        correct: currentQ.correct,
      },
    ];

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setUserAnswers(updatedAnswers);
      setSelectedOption("");
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/quiz/result", {
        state: {
          score: isCorrect ? score + 1 : score,
          userAnswers: updatedAnswers,
        },
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="quiz-container">
      <h1>CI/CD & DevOps Quiz</h1>
      <p className="timer">
        Time Left: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
      </p>

      <h2>
        Question {currentQuestion + 1}: {quizData[currentQuestion].question}
      </h2>

      <div className="progress-info">
        <p>Attempted: {currentQuestion}</p>
        <p>Remaining: {quizData.length - currentQuestion - 1}</p>
        <p>Total: {quizData.length}</p>
      </div>

      <div className="options">
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? "selected" : ""}`}
            onClick={() => setSelectedOption(option)}
          >
            {index + 1}. {option}
          </button>
        ))}
      </div>

      <div className="navigation-buttons">
        <button
          className="prev-button"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={handleAnswer}
          disabled={!selectedOption}
        >
          {currentQuestion < quizData.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
