const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true,
  },
  credits:{
    type:Number,
    default:6,
  },
  name: {
    type: String,
    required: true,
  },
  faculties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MasterFaculty",
    },
  ],
  semester:{
    type:Number,
    required:true,
  }
}, { timestamps: true });

const Courses = mongoose.model("Courses", courseSchema);
module.exports = Courses;
