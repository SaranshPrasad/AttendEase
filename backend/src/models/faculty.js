const mongoose = require("mongoose");
const validator = require("validator");
const facultySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 4,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "faculty",
    },
    phone: {
      type: Number,
      required: true,
    },
    is_verified:{
      type:Boolean,
      default:false,
    },
    courses: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses",
          },
        ],
  },
  { timestamps: true }
);
const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;
