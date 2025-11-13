import React, { useState, useEffect } from "react";
import "/src/css/AdminDashboard.css";
import { addExam, getExams, updateExam, deleteExamById } from "../../services/examService";
import AdminManageQuestions from "../Admin/AdminManageQuestions";

function AdminDashboard() {
  const [view, setView] = useState("manageExams");
  const adminName = localStorage.getItem("adminName") || "Admin";

  const [form, setForm] = useState({
    title: "",
    duration: "",
    passMarks: "",
    description: ""
  });

  const [exams, setExams] = useState([]);
  const [editingExamId, setEditingExamId] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getExams();
        setExams(data);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };
    fetchExams();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: form.title,
        duration: Number(form.duration),
        passMarks: Number(form.passMarks),
        description: form.description
      };

      if (editingExamId) {
        const updatedExam = await updateExam(editingExamId, payload);
        setExams(exams.map(exam => exam.id === editingExamId ? updatedExam : exam));
        setEditingExamId(null);
        alert(`Exam "${updatedExam.title}" updated successfully!`);
      } else {
        const newExam = await addExam(payload);
        setExams([...exams, newExam]);
        alert(`Exam "${newExam.title}" created successfully!`);
      }

      setForm({ title: "", duration: "", passMarks: "", description: "" });
    } catch (error) {
      console.error("Error saving exam:", error);
      alert("Failed to save exam. Check console for details.");
    }
  };

  const handleEdit = (exam) => {
    setForm({
      title: exam.title,
      duration: exam.duration,
      passMarks: exam.passMarks,
      description: exam.description
    });
    setEditingExamId(exam.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await deleteExamById(id);
      setExams(exams.filter(exam => exam.id !== id));
      alert("Exam deleted successfully!");
    } catch (error) {
      console.error("Error deleting exam:", error);
      alert("Failed to delete exam. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminName");
    window.location.href = "/";
  };

  return (
    <main className="main-content">
      <div className="admin-background-image"></div>

      <header className="admin-header">
        <div>
          <h2>Welcome, {adminName}</h2>
          <p>📅 {new Date().toLocaleDateString()}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-options">
        <button onClick={() => setView("manageExams")}>📝 Manage Exams</button>
        <button onClick={() => setView("viewResults")}>📊 View Results</button>
        <button onClick={() => setView("leaderboard")}>🏆 Leaderboard</button>
        <button onClick={() => setView("manageQuestions")}>❓ Manage Questions</button>
      </div>

      <div className="admin-content">
        {view === "manageExams" && (
          <section className="exam-section">
            <h3>Manage Exams</h3>
            <form className="exam-form" onSubmit={handleSubmit}>
              <input type="text" name="title" value={form.title} placeholder="Exam Title" onChange={handleChange} required />
              <input type="number" name="duration" value={form.duration} placeholder="Duration (minutes)" onChange={handleChange} required />
              <input type="number" name="passMarks" value={form.passMarks} placeholder="Pass Marks" onChange={handleChange} required />
              <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} />
              <button type="submit">{editingExamId ? "Update Exam" : "Add Exam"}</button>
            </form>

            <table className="exam-table">
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Duration</th>
                  <th>Pass Marks</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.title}</td>
                    <td>{exam.duration}</td>
                    <td>{exam.passMarks}</td>
                    <td>{exam.description || "N/A"}</td>
                    <td>
                      <button onClick={() => handleEdit(exam)}>Edit</button>
                      <button onClick={() => handleDelete(exam.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {view === "viewResults" && <p>Results coming soon...</p>}
        {view === "leaderboard" && <p>Leaderboard coming soon...</p>}

        {view === "manageQuestions" && (
          <AdminManageQuestions exams={exams} />
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;
