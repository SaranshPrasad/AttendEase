const jwt = require("jsonwebtoken");
require("dotenv").config();
const Student = require("../models/students");
const Faculty = require("../models/faculty");
const Admin = require("../models/admin");
const userAuth = async (req,res,next) => {
    const {token} = req.cookies;
    
    try {
        if(!token){
            return res.status(400).json({message:"Something went wrong login again !"});
        }
        const decodedMessage = await jwt.verify(token, process.env.SECRET_KEY);
        const {role, _id} = decodedMessage;
        if(role === "admin"){
            const admin = await Admin.findById(_id);
            if(!admin){
                throw new Error("Admin not found");
            }
            req.user = admin;
        }else if(role === "student"){
            const student = await Student.findById(_id);
            if(!student){
                throw new Error("Student not found");
            }
            req.user = student;
        }else if(role === "faculty"){
            const faculty = await Faculty.findById(_id);
            if(!faculty){
                throw new Error("Faculty not found");
            }
            req.user = faculty;
        }else{
            throw new Error("Unidentified token found!");
        }

        next();
    } catch (error) {
        res.status(400).json({message:"Something Went Wrong : "+error.message});
    }
}

module.exports = userAuth;