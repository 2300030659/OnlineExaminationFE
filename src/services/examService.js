import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/exams";

export const getExams = async () => {
  return await axios.get(API_BASE_URL);
};

export const addExam = async (examData) => {
  return await axios.post(API_BASE_URL, examData);
};

export const deleteExam = async (examId) => {
  return await axios.delete(`${API_BASE_URL}/${examId}`);
};

export const updateExam = async (examId, examData) => {
  return await axios.put(`${API_BASE_URL}/${examId}`, examData);
};
