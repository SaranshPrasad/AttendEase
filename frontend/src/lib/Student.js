import axios from "axios";

const API_URL = "http://localhost:5001/admin"; // Update if different

const Student = {
  list: async () => {
    const res = await axios.get(`${API_URL}/view/students`, {
      withCredentials: true,
    });
    // Return combined student data from both tables if needed
    return res.data.studentData || [];
  },

  create: async (studentData) => {
    const res = await axios.post(`${API_URL}/add/student`, studentData, {
      withCredentials: true,
    });
    return res.data;
  },

  update: async (id, studentData) => {
    const res = await axios.patch(`${API_URL}/update/student`, { _id: id, ...studentData }, {
      withCredentials: true,
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/delete/student`, {
      data: { _id: id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Student;
