import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import QuizDetails from "./components/QuizDetails";
import QuizPage from "./components/QuizPage";
import QuizResult from "./components/QuizResult";
import Leaderboard from "./components/Leaderboard";
import Rewards from "./components/Rewards";
import Resources from "./components/Resources";
import FAQs from "./components/FAQs";
import Blog from "./components/Blog";
import ClaimPoints from "./components/ClaimPoints";
import AdminDashboard from "./components/Admin/AdminDashboard";
import HomePage from "./components/HomePage";
import CreateExam from "./components/Admin/CreateExam";
import AdminManageQuestions from "./components/Admin/AdminManageQuestions";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz-details" element={<QuizDetails />} />
        <Route path="/quiz/start" element={<QuizPage />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/claim-points" element={<ClaimPoints />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/create-exam" element={<CreateExam />} />
                <Route path="/admin-dashboard/manage-questions" element={<AdminManageQuestions />} />







                     
      </Routes>
    </Router>
  );
};

export default App;
