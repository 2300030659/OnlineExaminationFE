// src/services/questionService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/questions"; // Adjust base URL as per your backend

// Get all questions for a specific exam
export const getQuestionsByExam = async (examId) => {
  try {
    const response = await axios.get(`${API_URL}/exam/${examId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Add a new question
export const addQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${API_URL}`, questionData);
    return response.data;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

// Update an existing question
export const updateQuestion = async (questionId, questionData) => {
  try {
    const response = await axios.put(`${API_URL}/${questionId}`, questionData);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

// Delete a question
export const deleteQuestionById = async (questionId) => {
  try {
    await axios.delete(`${API_URL}/${questionId}`);
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};
