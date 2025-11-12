import React, { useState } from "react";
import "/src/css/AdminDashboard.css"; // optional styling if you have it

function AdminDashboard() {
  const [view, setView] = useState("manageExams");
  const adminName = localStorage.getItem("adminName") || "Admin";

  return (
    <main className="main-content">
      <div className="admin-background-image"></div>

      <header className="admin-header">
        <h2>Welcome, {adminName}</h2>
        <p>📅 {new Date().toLocaleDateString()}</p>
      </header>

      {/* Admin Options */}
      <div className="admin-options">
        <button onClick={() => setView("manageExams")}>📝 Manage Exams</button>
        <button onClick={() => setView("viewResults")}>📊 View Results</button>
        <button onClick={() => setView("leaderboard")}>🏆 Leaderboard</button>
      </div>

      {/* Conditional Display */}
      <div className="admin-content">
        {view === "manageExams" && (
          <section className="exam-section">
            <h3>Manage Exams</h3>
            <form className="exam-form">
              <input type="text" placeholder="Exam Title" />
              <input type="date" placeholder="Exam Date" />
              <input type="number" placeholder="Duration (minutes)" />
              <textarea placeholder="Description"></textarea>
              <button type="submit">Add Exam</button>
            </form>

            <table className="exam-table">
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>React Quiz</td>
                  <td>2025-11-20</td>
                  <td>30</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {view === "viewResults" && (
          <section className="exam-section">
            <h3>View Results</h3>
            <p>Results section coming soon...</p>
          </section>
        )}

        {view === "leaderboard" && (
          <section className="exam-section">
            <h3>Leaderboard</h3>
            <p>Leaderboard details will appear here.</p>
          </section>
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;
