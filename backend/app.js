require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/database");
const authRouter = require("./src/routes/authRouter");
const adminRouter = require("./src/routes/adminRouter");
const csvRouter = require("./src/routes/csvRouter");
const attendanceRouter = require("./src/routes/attendanceRouter");
const facultyRouter = require("./src/routes/facultyRouter");
const studentRouter = require("./src/routes/studentRoutes");
app.use(
  cors({
    origin: process.env.PRODUCTION_URL,
    credentials: true,
  })
);
console.log("Env : ",process.env.PRODUCTION_URL)
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/faculty", facultyRouter);
app.use("/attendance", attendanceRouter);
app.use("/csv", csvRouter);
app.use("/student", studentRouter);
app.get("/", (req, res) => {
  res.status(200).json({ message: "HELLO FROM ATTENDANCE MANAGEMENT SYSTEM" });
});
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
