import axios from "axios";

const API_URL = "http://localhost:8080/api/exams";

export const addExam = async (exam) => {
  const response = await axios.post(API_URL, exam);
  return response.data;
};

export const getExams = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateExam = async (id, exam) => {
  const response = await axios.put(`${API_URL}/${id}`, exam);
  return response.data;
};

export const deleteExamById = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
