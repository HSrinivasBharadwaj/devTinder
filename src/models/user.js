const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 18,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          throw new Error("Invalid Email Format");
        }
      },
    },
    gender: {
      type: String,
      lowercase: true,
      //Custom Validation for genders;
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("Only Male and Female genders are allowed");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol"
          );
        }
      },
    },
    age: {
      type: Number,
    },
    about: {
      type: String,
      default: "Hey im developer I want to connect with you",
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Provide valid URL");
        }
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
