const mongoose = require("mongoose");

const attendanceSessionSchema = new mongoose.Schema({
  class_id: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  class_day:{
    type:String,
    enum:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required:true,
  },
  class_date:{
    type:Date,
    required:true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MasterFaculty",
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [ "active", "ended"],
  }
}, {timestamps:true});

const AttendanceSession = mongoose.model(
  "AttendanceSession",
  attendanceSessionSchema
);
module.exports = AttendanceSession;
