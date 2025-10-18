import axios from "axios";

const API_URL = "http://localhost:5001/admin"; // Update if your backend URL is different

const Timetable = {
  list: async () => {
    const res = await axios.get(`${API_URL}/view/timetable`, {
      withCredentials: true,
    });
    return res.data.timetables || [];
  },

  create: async (timetableData) => {
    const res = await axios.post(`${API_URL}/add/timetable`, timetableData, {
      withCredentials: true,
    });
    return res.data;
  },

//   update: async (id, timetableData) => {
//     const res = await axios.patch(
//       `${API_URL}/update/timetable`,
//       { _id: id, ...timetableData },
//       {
//         withCredentials: true,
//       }
//     );
//     return res.data;
//   },
listByFaculty: async (email) => {
    const res = await axios.get(`http://localhost:5001/faculty/view/timetable/${email}`);
    return res.data.timetable;
  },

  delete: async (id) => {
    const res = await axios.delete(`${API_URL}/delete/timetable`, {
      data: { _id: id },
      withCredentials: true,
    });
    return res.data;
  },
};

export default Timetable;
