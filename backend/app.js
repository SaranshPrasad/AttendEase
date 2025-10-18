
// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/database");
const cron = require("node-cron");

// Routers
const authRouter = require("./src/routes/authRouter");
const adminRouter = require("./src/routes/adminRouter");
const csvRouter = require("./src/routes/csvRouter");
const attendanceRouter = require("./src/routes/attendanceRouter");
const facultyRouter = require("./src/routes/facultyRouter");
const studentRouter = require("./src/routes/studentRoutes");
// Models (for cron job)
const Timetable = require("./src/models/timetable");
const AttendanceSession = require("./src/models/attendance");

// ======================
// 🔹 Middlewares
// ======================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ======================
// 🔹 Routers
// ======================
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/faculty", facultyRouter);
app.use("/attendance", attendanceRouter);
app.use("/csv", csvRouter);
app.use("/student", studentRouter);


// ======================
// 🔹 Test Routes
// ======================
app.get("/", (req, res) => {
  res.status(200).json({ message: "HELLO FROM ATTENDANCE MANAGEMENT SYSTEM" });
});

app.get("/test", (req, res) => {
  console.log(req.headers);
  console.log(req.headers["user-agent"]);
  res.send("Got your request!");
});

// ======================
// 🔹 Database + Server
// ======================
connectDB()
  .then(() => {
    console.log("✅ Database Connected!");
    app.listen(process.env.PORT || 5001, () => {
      console.log(`🚀 Server is listening at PORT ${process.env.PORT || 5001}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error in database connection:", err);
  });

// ======================
// 🔹 Auto Attendance Cron Job
// ======================
// cron.schedule("* * * * *", async () => {
//   try {
//     const now = new Date();
//     const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
//     const currentTime = now
//       .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

//     const toMinutes = (t) => {
//       const [h, m] = t.split(":").map(Number);
//       return h * 60 + m;
//     };

//     const currentMin = toMinutes(currentTime);
//     const timetables = await Timetable.find().populate(
//       "slots.subject slots.faculty"
//     );

//     for (const t of timetables) {
//       for (const slot of t.slots) {
//         if (t.day.toLowerCase() !== currentDay.toLowerCase()) continue;

//         const endMin = toMinutes(slot.end_time);

//         // ✅ If current time is 5 minutes before class ends
//         if (endMin - currentMin === 5) {
//           const existingSession = await AttendanceSession.findOne({
//             class_id: t.class_id,
//             subject: slot.subject._id,
//             status: "active",
//           });

//           if (!existingSession) {
//             const newSession = new AttendanceSession({
//               class_id: t.class_id,
//               semester: t.semester,
//               subject: slot.subject._id,
//               faculty: slot.faculty._id,
//               start_time: slot.start_time,
//               end_time: slot.end_time,
//               status: "active",
//             });

//             await newSession.save();
//             console.log(
//               `✅ Auto-started attendance for ${slot.subject.name} (${t.class_id})`
//             );
//           }
//         }
//       }
//     }
//   } catch (error) {
//     console.error("⚠️ Error in auto attendance cron:", error.message);
//   }
// });
