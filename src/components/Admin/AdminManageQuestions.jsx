import React, { useState, useEffect } from "react";
import "/src/css/AdminDashboard.css";
import { getExams } from "../../services/examService"; // Correct import
import {
  getQuestionsByExam,
  addQuestion,
  updateQuestion,
  deleteQuestionById,
} from "../../services/questionService";

function AdminManageQuestions() {
  const [exams, setExams] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const [form, setForm] = useState({
    questionText: "",
    questionType: "MCQ",
    options: ["", "", "", ""],
    correctAnswer: "",
    marks: "",
  });

  // Load exams
  useEffect(() => {
    const fetchExams = async () => {
      const data = await getExams();
      setExams(data);
      if (data.length > 0) setSelectedExamId(data[0].id);
    };
    fetchExams();
  }, []);

  // Load questions when exam changes
  useEffect(() => {
    if (!selectedExamId) return;
    const fetchQuestions = async () => {
      const data = await getQuestionsByExam(selectedExamId);
      setQuestions(data);
    };
    fetchQuestions();
  }, [selectedExamId]);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === "options" && index !== null) {
      const newOptions = [...form.options];
      newOptions[index] = value;
      setForm({ ...form, options: newOptions });
    } else if (name === "questionType") {
      setForm({ ...form, questionType: value, options: ["", "", "", ""], correctAnswer: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        questionText: form.questionText,
        questionType: form.questionType,
        options: form.questionType === "MCQ" ? JSON.stringify(form.options) : null,
        correctAnswer: form.questionType === "MCQ" ? form.correctAnswer : null,
        marks: Number(form.marks),
        exam: { id: selectedExamId },
      };

      if (editingQuestionId) {
        const updated = await updateQuestion(editingQuestionId, payload);
        setQuestions(questions.map((q) => (q.id === editingQuestionId ? updated : q)));
        setEditingQuestionId(null);
      } else {
        const added = await addQuestion(payload);
        setQuestions([...questions, added]);
      }

      setForm({
        questionText: "",
        questionType: "MCQ",
        options: ["", "", "", ""],
        correctAnswer: "",
        marks: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error saving question");
    }
  };

  const handleEdit = (q) => {
    setEditingQuestionId(q.id);
    setForm({
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.questionType === "MCQ" ? JSON.parse(q.options) : ["", "", "", ""],
      correctAnswer: q.correctAnswer || "",
      marks: q.marks,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await deleteQuestionById(id);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting question");
    }
  };

  return (
    <div className="exam-section">
      <h3>Manage Questions</h3>

      {/* Select Exam */}
      <div>
        <label>Select Exam: </label>
        <select
          value={selectedExamId}
          onChange={(e) => setSelectedExamId(e.target.value)}
        >
          {exams.map((exam) => (
            <option key={exam.id} value={exam.id}>
              {exam.title}
            </option>
          ))}
        </select>
      </div>

      {/* Add/Edit Form */}
      <form className="exam-form" onSubmit={handleSubmit}>
        <textarea
          name="questionText"
          placeholder="Question Text"
          value={form.questionText}
          onChange={handleChange}
          required
        />

        <div>
          <label>Type: </label>
          <select
            name="questionType"
            value={form.questionType}
            onChange={handleChange}
          >
            <option value="MCQ">MCQ</option>
            <option value="ESSAY">Essay</option>
          </select>
        </div>

        {form.questionType === "MCQ" && (
          <div>
            <p>Options:</p>
            {form.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                name="options"
                value={opt}
                onChange={(e) => handleChange(e, idx)}
                placeholder={`Option ${idx + 1}`}
                required
              />
            ))}
            <input
              type="text"
              name="correctAnswer"
              value={form.correctAnswer}
              placeholder="Correct Answer"
              onChange={handleChange}
              required
            />
          </div>
        )}

        {form.questionType === "ESSAY" && (
          <div>
            <p>Essay questions don’t require options or correct answer.</p>
          </div>
        )}

        <input
          type="number"
          name="marks"
          value={form.marks}
          onChange={handleChange}
          placeholder="Marks"
          required
        />

        <button type="submit">{editingQuestionId ? "Update" : "Add"} Question</button>
      </form>

      {/* Questions Table */}
      <table className="exam-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Type</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.questionText}</td>
              <td>{q.questionType}</td>
              <td>{q.marks}</td>
              <td>
                <button onClick={() => handleEdit(q)}>Edit</button>
                <button onClick={() => handleDelete(q.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminManageQuestions;
