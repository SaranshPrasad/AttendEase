import axios from "axios";

const API_URL = "http://localhost:5001/admin"; // Update if different

const Faculty = {
  list: async () => {
    const res = await axios.get(`${API_URL}/view/faculty`);
    return res.data.facultyData || [];
  },

  create: async (facultyData) => {
    const res = await axios.post(`${API_URL}/add/faculty`, facultyData, {
      withCredentials: true,
    });
    console.log(facultyData);
    return res.data;
  },

  update: async (id, facultyData) => {
    const res = await axios.patch(`${API_URL}/update/courses/faculty`, { _id: id, ...facultyData }, {
      withCredentials: true,
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/delete/faculty`, {
      data: { _id: id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Faculty;
