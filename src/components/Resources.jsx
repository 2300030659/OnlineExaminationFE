import React from "react";
import "../css/Resources.css";

const Resources = () => {
  return (
    <div className="resources-wrapper">
      <div className="resources-container">
        <h2 className="resources-title">Resources</h2>
        <p className="resources-description">
          Access a wide range of study materials to enhance your MERN stack development skills.
        </p>

        <div className="resources-content">
          <div className="resource-category">
            <h3>📚 Notes</h3>
            <ul>
              <li><a href="https://www.freecodecamp.org/news/mern-stack-guide/" target="_blank">MERN Stack Crash Course Notes</a></li>
              <li><a href="https://www.mongodb.com/docs/manual/" target="_blank">MongoDB Notes</a></li>
              <li><a href="https://devhints.io/express" target="_blank">Express.js Cheat Sheet</a></li>
            </ul>
          </div>

          <div className="resource-category">
            <h3>🎥 Videos</h3>
            <ul>
              <li><a href="https://www.youtube.com/watch?v=7CqJlxBYj-M" target="_blank">MERN Stack Full Tutorial</a></li>
              <li><a href="https://www.youtube.com/watch?v=Ke90Tje7VS0" target="_blank">React JS in 100 Minutes</a></li>
              <li><a href="https://www.youtube.com/watch?v=fBNz5xF-Kx4" target="_blank">Node.js Crash Course</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
