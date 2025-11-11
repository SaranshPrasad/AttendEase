import axios from "axios";

const API_URL = "http://localhost:5001/admin";

const Faculty = {
  list: async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/view/faculty`);
    return res.data.facultyData || [];
  },

  create: async (facultyData) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/add/faculty`, facultyData, {
      withCredentials: true,
    });
    console.log(facultyData);
    return res.data;
  },

  update: async (id, facultyData) => {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/admin/update/courses/faculty`, { _id: id, ...facultyData }, {
      withCredentials: true,
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete/faculty`, {
      data: { _id: id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Faculty;
