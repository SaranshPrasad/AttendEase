const express = require("express");
const attendanceRouter = express.Router();

const AttendanceSession = require("../models/attendance");
const AttendanceRecord = require("../models/attendanceRecords");
const MasterStudent = require("../models/master_students");
const MasterFaculty = require("../models/master_faculty");
const userAuth = require("../middleware/auth");

attendanceRouter.use(express.json());

// attendanceRouter.get("/active", userAuth, async (req, res) => {
//   try {
//     const { role } = req.user;

//     if (role === "student") {
//       const response = await AttendanceSession.find()
//         .populate("faculty", "name")  
//         .populate("subject", "name")
//         .lean();
      
//       console.log(response);
//       if (response.length > 0 && response.status === 'active') {
//         res.status(200).json({ message: "Attendance Sessions fetched", response });
//       } else {
//         res.status(200).json({ message: "No active sessions", response });
//       }
//     } else {
//       throw new Error("Student role required to fetch active sessions");
//     }
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong", error: error.message });
//   }
// });
attendanceRouter.get("/active", userAuth, async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "student") {
      throw new Error("Student role required to fetch active sessions");
    }

    // Fetch all sessions and populate faculty and subject details
    const sessions = await AttendanceSession.find()
      .populate("faculty", "name")
      .populate("subject", "name")
      .lean();

    // Filter only active sessions
    const activeSessions = sessions.filter((session) => session.status === "active");

    if (activeSessions.length > 0) {
      res.status(200).json({ message: "Active attendance sessions fetched", sessions: activeSessions });
    } else {
      res.status(200).json({ message: "No active sessions", sessions: [] });
    }

  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error: error.message });
  }
});


attendanceRouter.post("/create/active/session", userAuth, async (req,res) => {
  const {role} = req.user;
  const {class_id, semester, class_day,class_date, subject, faculty, start_time, end_time} = req.body;
  try {
    if(role === 'faculty'){
      const data = new AttendanceSession({
        class_id,
        semester,
        class_day,
        class_date,
        subject,
        faculty,
        start_time,
        end_time,
        status:"active",
      });
      
      const newSession = await data.save();
      const session = await (await newSession.populate("faculty", "name")).populate("subject", "name")

      res.status(200).json({message:"An active session is created now : ", session});
    }else{
      throw new Error("Only faculty can create an active attendance sessions");
    }
  } catch (error) {
    res.status(404).json({message:"Something went wrong : ", error});
  }
});

attendanceRouter.post("/mark", userAuth, async (req, res) => {
  try {
    const { role } = req.user; 
    if (role !== "student") {
      return res.status(403).json({ message: "Only students can mark attendance." });
    }

    const { sessionId, class_id, faculty, student } = req.body;

    if (!sessionId || !class_id || !faculty) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Prevent duplicate marking
    const alreadyMarked = await AttendanceRecord.findOne({
      session: sessionId,
      student: student,
    });

    if (alreadyMarked) {
      return res.status(400).json({ message: "Attendance already marked!" });
    }

    const data = new AttendanceRecord({
      session: sessionId,
      student: student,
      status: "present",
      class_id,
      faculty,
    });

    const markAttendance = await data.save();
    res.status(200).json({ message: "Attendance Marked Successfully", markAttendance });
  } catch (error) {
    console.error("Attendance marking error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

attendanceRouter.patch("/end/session/:sessionId", userAuth, async (req,res) => {
  const {role} = req.user;
  const {sessionId} = req.params;
  try {
    if(role === 'faculty'){
    const existingSession = await AttendanceSession.findByIdAndUpdate(sessionId, {status:"ended"});
    res.status(200).json({message:"Session ended..", existingSession});
    }else{
      throw new Error("Only facullty can end a session...");
      
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
    
  }
});


attendanceRouter.get("/active/session/:facultyId", userAuth, async (req,res) => {
  const {facultyId} = req.params;
  try {
    const sessions = await AttendanceSession.find({faculty:facultyId});
    res.status(200).json({message:"Session fetched!", sessions});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
    
  }
})



attendanceRouter.get("/session/:sessionId/stats", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await AttendanceSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    const presentCount = await AttendanceRecord.countDocuments({
      session: sessionId,
      status: "present",
    });

    const totalRecords = await AttendanceRecord.countDocuments({
      session: sessionId,
    });



    res.status(200).json({
      session_id: session._id,
      class_id: session.class_id,
      subject: session.subject,
      total_present: presentCount,
      total_marked: totalRecords,
      remaining: totalRecords - presentCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

attendanceRouter.get("/live/:sessionId", userAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Ensure the session exists
    const session = await AttendanceSession.findById(sessionId)
      .populate("faculty", "name")
      .populate("subject", "name")
      .lean();

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Fetch attendance records for that session
    const records = await AttendanceRecord.find({ session: sessionId })
      .populate("student", "name student_id")
      .lean();

    const presentStudents = records.filter(r => r.status === "present").map(r => r.student);
    const absentStudents = records.filter(r => r.status === "absent").map(r => r.student);

    res.status(200).json({
      message: "Live attendance fetched successfully",
      session,
      presentStudents,
      absentStudents,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching live attendance", error: error.message });
  }
});

module.exports = attendanceRouter;
