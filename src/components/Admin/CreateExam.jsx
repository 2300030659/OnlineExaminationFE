import React, { useState } from "react";
import { addExam } from "../../services/examService";

const CreateExam = () => {
    const [form, setForm] = useState({
        title: "",
        duration: "",
        passMarks: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting:", form);

        try {
            const result = await addExam(form);
            console.log("Saved:", result);
            alert(`Exam "${result.title}" created successfully!`);
            setForm({ title: "", duration: "", passMarks: "" });
        } catch (error) {
            console.error("Error creating exam:", error);
            alert("Failed to create exam. Check console for details.");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Create New Exam</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Duration (minutes):</label>
                    <input
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Pass Marks:</label>
                    <input
                        type="number"
                        name="passMarks"
                        value={form.passMarks}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Exam</button>
            </form>
        </div>
    );
};

export default CreateExam;
