const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AttendanceSession",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MasterStudent",
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent"],
    default: "absent",
  },
  markedAt: {
    type: Date,
    default: Date.now,
  },
  class_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses",
    required:true
  },
  faculty:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "MasterFaculty",
    required: true,
  }
});

const AttendanceRecord = mongoose.model(
  "AttendanceRecord",
  attendanceRecordSchema
);
module.exports = AttendanceRecord;
