import axios from "axios";

const API_URL = "http://localhost:5001/admin";

const Course = {
  // 🔹 View all courses
  list: async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/view/courses`);
    return res.data.courses || [];
  },
  create: async (courseData) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/add/course`, courseData, {
      withCredentials: true,
    });
    return res.data;
  },
  delete: async (course_id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete/course`, {
      data: { course_id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Course;
