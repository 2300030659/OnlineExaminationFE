import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '/src/css/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('admin@gmail.com');
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [quizzesConducted, setQuizzesConducted] = useState(0);
  const [view, setView] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || 'Admin';
    const storedEmail = localStorage.getItem('userEmail') || 'admin@gmail.com';
    setAdminName(storedName);
    setAdminEmail(storedEmail);
    setQuizzesConducted(5);

    const defaultCategories = [
      { _id: 'default1', name: 'General Knowledge' },
      { _id: 'default2', name: 'Science & Nature' },
      { _id: 'default3', name: 'History' },
      { _id: 'default4', name: 'Mathematics' },
      { _id: 'default5', name: 'Entertainment' }
    ];

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        const combined = [...defaultCategories, ...response.data];
        setCategories(combined);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(defaultCategories);
      }
    };
    fetchCategories();
  }, []);

  const handleQuizTitleChange = (e) => setQuizTitle(e.target.value);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'question' || field === 'correctAnswer') {
      newQuestions[index][field] = value;
    } else {
      newQuestions[index].options[field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      navigate('/login');
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quiz = {
      title: quizTitle,
      questions,
      category: selectedCategory,
      createdBy: adminName,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/quizzes', quiz, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Quiz Created and Saved!');
      setQuizTitle('');
      setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error saving quiz:', error);
      alert('Failed to save quiz. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
<h2 style={{ color: "#f0f0f0" }}>Admin Dashboard</h2>
        <p className="welcome">Welcome, {adminName}</p>
        <button onClick={() => setView('createQuiz')}>📝 Create Quiz</button>
        <button onClick={() => setView('adminDetails')}>👤 Admin Profile</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </aside>

      <main className="main-content">
        {view === 'createQuiz' && (
          <div className="quiz-section">
            <h3>Create New Quiz</h3>
            <form onSubmit={handleSubmit} className="quiz-form">
              <input
                type="text"
                placeholder="Enter Quiz Title"
                value={quizTitle}
                onChange={handleQuizTitleChange}
                required
              />
              <select value={selectedCategory} onChange={handleCategoryChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {questions.map((q, index) => (
                <div key={index} className="question-block">
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    required
                  />
                  {q.options.map((opt, optIdx) => (
                    <input
                      key={optIdx}
                      type="text"
                      placeholder={`Option ${optIdx + 1}`}
                      value={opt}
                      onChange={(e) => handleQuestionChange(index, optIdx, e.target.value)}
                      required
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.correctAnswer}
                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={addQuestion}>+ Add Question</button>
              <button type="submit">✅ Create Quiz</button>
            </form>
          </div>
        )}

        {view === 'adminDetails' && (
          <div className="admin-details-section">
            <h3>Admin Profile</h3>
            <div className="admin-profile">
              <div className="admin-info-container">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Admin Avatar"
                  className="admin-avatar"
                />
                <div className="admin-text-info">
                  <p><strong>Name:</strong> {adminName}</p>
                  <p><strong>Email:</strong> {adminEmail}</p>
                  <p><strong>Quizzes Conducted:</strong> {quizzesConducted}</p>
                  <p><strong>Date Joined:</strong> March 15, 2024</p>
                  <p><strong>Role:</strong> Platform Administrator</p>
                  <p><strong>Bio:</strong> Passionate about creating interactive quizzes and engaging learning tools for all users.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!view && (
          <div className="admin-background-image" />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
