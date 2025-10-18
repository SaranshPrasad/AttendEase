const mongoose = require("mongoose");
const validator = require("validator");
const masterfacultySchema = mongoose.Schema(
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
    phone: {
      type: Number,
      required: true,
    },
    faculty_id: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    account_created:{
    type:Boolean,
    default:false,
  }
  },

  { timestamps: true }
);
const MasterFaculty = mongoose.model("MasterFaculty", masterfacultySchema);
module.exports = MasterFaculty;
