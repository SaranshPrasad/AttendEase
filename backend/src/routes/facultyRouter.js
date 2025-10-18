
require("dotenv").config();
const express = require("express");
const MasterFaculty = require("../models/master_faculty");
const cookieParser = require("cookie-parser");
const { default: Course } = require("../../../frontend/src/lib/Course");
const Timetable = require("../models/timetable");
const facultyRouter = express.Router();

facultyRouter.use(express.json());
facultyRouter.use(cookieParser());

facultyRouter.get("/view/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const faculty = await MasterFaculty.findOne({ email: email }).populate("courses");
    if (!faculty) {
      throw new Error(`Faculty not found with ${email}.`);
    }
    const courses = faculty.courses;
    return res.status(200).json({
      message: "Faculty Found..",
      faculty,
      courses,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong: " + error.message,
    });
  }
});


facultyRouter.get("/view/timetable/:email", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the faculty using their email
    const faculty = await MasterFaculty.findOne({ email });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    const facultyId = faculty._id;

    // Find timetables where any slot's faculty matches this faculty ID
    const timetable = await Timetable.find({ "slots.faculty": facultyId })
      .populate("slots.subject")
      .populate("slots.faculty");

    res.status(200).json({
      message: "Timetable fetched successfully",
      faculty,
      timetable,
    });
  } catch (error) {
    console.error("Error fetching timetable:", error);
    res.status(500).json({
      message: "Something went wrong: " + error.message,
    });
  }
});








module.exports = facultyRouter;
