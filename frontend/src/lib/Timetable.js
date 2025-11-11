import axios from "axios";

const API_URL = "http://localhost:5001/admin";

const Timetable = {
  list: async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/view/timetable`, {
      withCredentials: true,
    });
    return res.data.timetables || [];
  },

  create: async (timetableData) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/add/timetable`, timetableData, {
      withCredentials: true,
    });
    return res.data;
  },
listByFaculty: async (email) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/faculty/view/timetable/${email}`);
    return res.data.timetable;
  },

  delete: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/delete/timetable`, {
      data: { _id: id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Timetable;
