const mongoose = require("mongoose");
const validator = require("validator");
const adminSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        minLength:4,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
            type:String,
            unique:true,
            lowercase:true,
            trim:true,
            minLength:4,
            required:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Email is not valid : "+value); 
                }
            }
        },
    role:{
            type:String,
            default:"admin",
        },

}, {timestamps:true});

const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;