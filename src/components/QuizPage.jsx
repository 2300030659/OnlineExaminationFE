import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/src/css/QuizPage.css";

const quizData = [
  {
    question: "What does the 'M' in MERN stack stand for?",
    options: ["MongoDB", "MySQL", "Mongoose", "Markdown"],
    correct: "MongoDB",
  },
  {
    question: "Which framework is used in the MERN stack for building server-side applications?",
    options: ["Express.js", "React", "Next.js", "Bootstrap"],
    correct: "Express.js",
  },
  {
    question: "What is the primary role of React in the MERN stack?",
    options: ["Database", "Frontend UI", "Backend Server", "Authentication"],
    correct: "Frontend UI",
  },
  {
    question: "Node.js is used to:",
    options: ["Style webpages", "Run JavaScript on the server", "Design databases", "Structure HTML"],
    correct: "Run JavaScript on the server",
  },
  {
    question: "Which of the following is a NoSQL database?",
    options: ["MongoDB", "PostgreSQL", "MySQL", "Oracle"],
    correct: "MongoDB",
  },
  {
    question: "In MongoDB, data is stored in:",
    options: ["Tables", "Spreadsheets", "Collections", "Schemas"],
    correct: "Collections",
  },
  {
    question: "Which hook is commonly used to manage side effects in React?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    correct: "useEffect",
  },
  {
    question: "What command is used to start a Node.js app?",
    options: ["npm run", "node app.js", "start node", "run app.js"],
    correct: "node app.js",
  },
  {
    question: "What is JSX?",
    options: ["A JavaScript extension syntax", "A new version of JSON", "A server tool", "A testing library"],
    correct: "A JavaScript extension syntax",
  },
  {
    question: "Which command installs all dependencies listed in package.json?",
    options: ["npm install", "npm build", "npm start", "node install"],
    correct: "npm install",
  },
];

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(600);
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
      <h1>Quiz</h1>
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
