const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength:1,
        maxLength:18 
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value) {
           const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           if (!emailRegex.test(value)) {
                throw new Error("Invalid Email Format")
           } 
        }    
    },
    gender: {
        type: String,
        lowercase:true,
        //Custom Validation for genders;
        validate(value) {
            if (!["male","female"].includes(value)) {
                throw new Error("Only Male and Female genders are allowed")
            }
        }
    },
    password: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required:true,
    },
    about: {
        type: String,
        default: "Hey im developer I want to connect with you"
    },
    skills: {
        type: [String],
    },
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s"
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)