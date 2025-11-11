import axios from "axios";

const API_URL = "http://localhost:5001/admin"; // Update if different

const Student = {
  list: async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/view/students`, {
      withCredentials: true,
    });
    return res.data.studentData || [];
  },

  create: async (studentData) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/add/student`, studentData, {
      withCredentials: true,
    });
    return res.data;
  },

  update: async (id, studentData) => {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/update/student`, { _id: id, ...studentData }, {
      withCredentials: true,
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete/student`, {
      data: { _id: id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Student;
