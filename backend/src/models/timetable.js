const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  class_id: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    required: true,
  },
  semester:{
    type:Number,
    required:true,
  },
  slots: [
    {
      slot_number: {
        type: Number, 
        required: true,
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
      room: {
        type: String,
      },
      start_time: {
        type: String, 
      },
      end_time: {
        type: String, 
      },
    },
  ],
});


const Timetable = mongoose.model("Timetable", timetableSchema);
module.exports = Timetable;
