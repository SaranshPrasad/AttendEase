import axios from "axios";

const API_URL = "http://localhost:5001/admin"; // adjust if backend port differs

const Course = {
  // 🔹 View all courses
  list: async () => {
    const res = await axios.get(`${API_URL}/view/courses`);
    return res.data.courses || [];
  },

  // 🔹 Add a new course
  create: async (courseData) => {
    const res = await axios.post(`${API_URL}/add/course`, courseData, {
      withCredentials: true,
    });
    return res.data;
  },

  // 🔹 Delete a course
  delete: async (course_id) => {
    const res = await axios.delete(`${API_URL}/delete/course`, {
      data: { course_id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Course;
