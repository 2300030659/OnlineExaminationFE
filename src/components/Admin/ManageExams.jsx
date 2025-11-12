import React, { useState, useEffect } from "react";
import { getExams, addExam, deleteExam } from "../../services/examService";
import "/src/css/ManageExams.css"; // ✅ Correct relative path

const ManageExams = () => {
  const [exams, setExams] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    passMarks: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const response = await getExams();
      setExams(response);
    } catch (err) {
      console.error("Error loading exams:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addExam(form);
      setForm({
        title: "",
        description: "",
        duration: "",
        passMarks: "",
        startTime: "",
        endTime: "",
      });
      loadExams();
    } catch (err) {
      console.error("Error adding exam:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) return;
    try {
      await deleteExam(id);
      loadExams();
    } catch (err) {
      console.error("Error deleting exam:", err);
    }
  };

  return (
    <div className="manage-exams-container">
      <h2>📘 Manage Exams</h2>

      <form className="exam-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Exam Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="duration"
          placeholder="Duration (mins)"
          value={form.duration}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="passMarks"
          placeholder="Pass Marks"
          value={form.passMarks}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Exam</button>
      </form>

      <table className="exam-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Pass Marks</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.title}</td>
              <td>{exam.duration} min</td>
              <td>{exam.passMarks}</td>
              <td>{exam.startTime}</td>
              <td>{exam.endTime}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(exam.id)}
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageExams;
