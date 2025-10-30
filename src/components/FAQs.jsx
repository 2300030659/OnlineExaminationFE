import React from "react";
import "../css/FAQs.css";

const faqData = [
  {
    question: "What is QuizVantage?",
    answer: "QuizVantage is an online platform where users can take quizzes, track progress, and earn rewards."
  },
  {
    question: "How do I register for a quiz?",
    answer: "You can register for a quiz by signing up, logging in, and selecting an available quiz from the dashboard."
  },
  {
    question: "Are the quizzes timed?",
    answer: "Yes, most quizzes have a specific time limit to increase challenge and fairness."
  },
  {
    question: "How are rewards calculated?",
    answer: "Rewards are based on quiz performance, speed, and leaderboard position."
  },
  {
    question: "Can I review my answers after the quiz?",
    answer: "Yes, once a quiz is submitted, you can view correct answers and explanations."
  }
];

const FAQs = () => {
  return (
    <div className="faqs-wrapper">
      <div className="faqs-container">
        <h2 className="faqs-title">Frequently Asked Questions</h2>
        <p className="faqs-description">
          Find answers to the most common questions about QuizVantage.
        </p>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
