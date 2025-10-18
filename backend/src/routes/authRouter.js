require("dotenv").config
const express = require("express");
const authRouter = express.Router();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const MasterStudent = require("../models/master_students");
const Student = require("../models/students");
const Admin = require("../models/admin");
const MasterFaculty = require("../models/master_faculty");
const Faculty = require("../models/faculty");
const generateFingerprint = require("../utils/fingerprint");
const userAuth = require("../middleware/auth");
authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    if (data.role === "student") {
      const {
        name,
        password,
        email,
        student_id,
        session,
        semester,
        role,
        department,
        deviceInfo
      } = data;
      const check_verification = await MasterStudent.findOne({ student_id });
      if (!check_verification.account_created) {
        const hashedPassword = await bcrypt.hash(password, 10);
        

        // 4. Generate fingerprint
        const fingerprint = generateFingerprint(deviceInfo);
        const newStudent = new Student({
          name: name,
          password: hashedPassword,
          email: email,
          student_id: student_id,
          session: session,
          semester: semester,
          role: role,
          department: department,
          deviceInfo: {
        ...deviceInfo,
        fingerprint,
      },
        });
        console.log(deviceInfo);
        const newData = await newStudent.save();
        check_verification.account_created = true;
        await check_verification.save();
        res
          .status(200)
          .json({ message: "Student Account Created Successfully !", newData });
      } else {
        throw new Error("Account already created for this student !");
      }
    } else if (data.role === "admin") {
      const { name, email, password, role } = data;
      const existingAdmin = await Admin.findOne({ email });
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!existingAdmin) {
        const newAdmin = new Admin({
          name: name,
          password: hashedPassword,
          role: role,
          email: email,
        });
        const adminData = await newAdmin.save();
        res
          .status(200)
          .json({ message: "Admin Account created successfully !", adminData });
      } else {
        throw new Error("Admin already exists !");
      }
    } else if (data.role === "faculty") {
      const { name, email, phone, password, role, faculty_id } = data;
      const existingFaculty = await MasterFaculty.findOne({ faculty_id });
      const hashedPassword = await bcrypt.hash(password, 10);
      if (!existingFaculty.account_created) {
        const newFaculty = new Faculty({
          name: name,
          password: hashedPassword,
          email: email,
          phone: phone,
          role: role,
        });
        const facultyData = await newFaculty.save();
        existingFaculty.account_created = true;
        await existingFaculty.save();
        res.status(200).json({
          messgae: "Faculty account created successfully !",
          facultyData,
        });
      } else {
        throw new Error("Faculty already exists!");
      }
    } else {
      throw new Error("Role not matched !");
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong : " + error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  const data = req.body;
  try {
    if(data.role === "admin"){
      const {role, email, password} = data;
      const existingAdmin = await Admin.findOne({email});
      if(!existingAdmin){
        throw new Error("Invalid credentials!");
      }else{
        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
        if(isPasswordValid){
          const token = await jwt.sign({role:existingAdmin.role, _id:existingAdmin._id}, process.env.SECRET_KEY);
          res.cookie('token', token,{
                httpOnly: true,
                secure: true, 
                sameSite: "None", 
              });
          res.status(200).json({message:`Welcome ${existingAdmin.name}!`, user:existingAdmin, token, role});
        }else{
          return res.status(400).json({message:"Login Error!"});
        }
      }
    }else if(data.role === "student"){
      const {role, student_id, password,deviceInfo} = data;
      const existingStudent = await Student.findOne({student_id});
      
        const fingerprint = generateFingerprint(deviceInfo);
        if(fingerprint != existingStudent?.deviceInfo?.fingerprint){
          throw new Error("Unrecognised device found!");
        }
      if(!existingStudent || !existingStudent.is_verified){
        throw new Error("Invalid credentials! Or Student Not Verified!");

      }else{
        const isPasswordValid = await bcrypt.compare(password, existingStudent.password);
        if(isPasswordValid){
          const token = await jwt.sign({role:existingStudent.role, _id:existingStudent._id}, process.env.SECRET_KEY);
          res.cookie('token', token,{
                httpOnly: true,
                secure: true, 
                sameSite: "None", 
              });
          res.status(200).json({message:`Welcome ${existingStudent.name}!`, user:existingStudent, token, role});
        }else{
          return res.status(400).json({message:"Login Error!"});
        }
      }
    }else if(data.role === "faculty"){
        const {role, email, password} = data;
      const existingFaculty = await Faculty.findOne({email});
      if(!existingFaculty || !existingFaculty.is_verified){
        throw new Error("Invalid credentials! Or Faculty Not Verified!");
      }else{
        const isPasswordValid = await bcrypt.compare(password, existingFaculty.password);
        if(isPasswordValid){
          const token = await jwt.sign({role:existingFaculty.role, _id:existingFaculty._id}, process.env.SECRET_KEY);
          res.cookie('token', token,{
                httpOnly: true,
                secure: true, 
                sameSite: "None", 
              });
          res.status(200).json({message:`Welcome ${existingFaculty.name}!`, user:existingFaculty, token, role});
        }else{
      throw new Error("Login Error..");
         
        }
      }
    }else{
      throw new Error("Login Error..");
    }
  } catch (error) {
    res.status(400).json({messgae:"Something went wrong : "+error.message});
  }
});

authRouter.post("/logout", userAuth , async (req, res) => {
    const {name}  = req.user;
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.status(200).json({message:`${name} Logout Successfully !`})
});

module.exports = authRouter;
