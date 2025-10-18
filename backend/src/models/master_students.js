const mongoose = require("mongoose");
const validator = require("validator");
const masterStudentSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 4,
    required: true,
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
  student_id:{
    type:String,
    required:true,
    minLength:12,
    maxLength:17,
    unique:true,
  },
  session:{
    type:String,
    required:true,
    minLength:9,
    maxLength:9,
  },
  semester:{
    type:Number,
    required:true,
  },
  dob:{
    type:Date,
  },
  department:{
    type:String,
    enum:["BCA", "BSCIT","BCOMCA"]
  },
  account_created:{
    type:Boolean,
    default:false,
  }
}, {timestamps:true});

const MasterStudent = mongoose.model("MasterStudent", masterStudentSchema);
module.exports = MasterStudent;
