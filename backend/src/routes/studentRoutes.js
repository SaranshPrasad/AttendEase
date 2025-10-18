
require("dotenv").config();
const express = require("express");
const MasterFaculty = require("../models/master_faculty");
const cookieParser = require("cookie-parser");
const { default: Course } = require("../../../frontend/src/lib/Course");
const Timetable = require("../models/timetable");
const userAuth = require("../middleware/auth");
const MasterStudent = require("../models/master_students");
const studentRouter = express.Router();

studentRouter.use(express.json());
studentRouter.use(cookieParser());


studentRouter.get("/view/timetable/:day/:semester", async (req, res) => {
  try {
    const { day, semester } = req.params;


    const timetable = await Timetable.find({ "day": day, "semester":semester})
      .populate("slots.subject")
      .populate("slots.faculty");

    res.status(200).json({
      message: "Timetable fetched successfully",
      timetable,
    });
  } catch (error) {
    
    res.status(500).json({
      message: "Something went wrong: " + error.message,
    });
  }
});


studentRouter.get("/view/:email",  async (req,res) => {
    const {email} = req.params;
   try {
     const student = await MasterStudent.findOne({email:email});
    if(!student){
        throw new Error("Student data not found in the master table !");
    }else{
        res.status(200).json({message:"Student Fetched", student});
    }
   } catch (error) {
    res.status(500).json({
      message: "Something went wrong: " + error.message,
    });
   }
} );





module.exports = studentRouter;
