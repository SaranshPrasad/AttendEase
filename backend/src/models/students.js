const mongoose = require("mongoose");
const validator = require("validator");
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: 4,
    required: true,
  },
  password: {
    type: String,
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
    required:true
  },
  role:{
    type:String,
    default:"student",
    required:true,
  },
  is_verified:{
    type:Boolean,
    default:false,
  },
  department:{
    type:String,
    required:true,
  },
 deviceInfo: {
    userAgent: String,
    platform:String,
    language:String,
    screenResolution:String,
    timezone:String,  
    deviceModel: String,
    os: String,          
    browser: String,      
    fingerprint: String,
  }
}, {timestamps:true});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
