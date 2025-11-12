import React, { useEffect, useState } from "react";
import axios from "axios";

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({
    title: "",
    description: "",
    duration: "",
    passMarks: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/exams");
      setExams(response.data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/exams", newExam);
      fetchExams();
      setNewExam({
        title: "",
        description: "",
        duration: "",
        passMarks: "",
        startTime: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Error adding exam:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Exams</h2>

      <form onSubmit={handleAddExam}>
        <input
          type="text"
          placeholder="Title"
          value={newExam.title}
          onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newExam.description}
          onChange={(e) =>
            setNewExam({ ...newExam, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Duration (mins)"
          value={newExam.duration}
          onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Pass Marks"
          value={newExam.passMarks}
          onChange={(e) =>
            setNewExam({ ...newExam, passMarks: e.target.value })
          }
          required
        />
        <input
          type="datetime-local"
          value={newExam.startTime}
          onChange={(e) =>
            setNewExam({ ...newExam, startTime: e.target.value })
          }
          required
        />
        <input
          type="datetime-local"
          value={newExam.endTime}
          onChange={(e) => setNewExam({ ...newExam, endTime: e.target.value })}
          required
        />
        <button type="submit">Add Exam</button>
      </form>

      <h3>Existing Exams</h3>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>
            <strong>{exam.title}</strong> - {exam.description} ({exam.duration} mins)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
