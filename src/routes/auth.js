const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validate");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  validateSignUpData(req.body);
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hashSync(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.status(200).send("User Added Successfully");
  } catch (error) {
    console.log("error in signup", error);
    res.status(500).send(error);
  }
});

authRouter.post("/login", async (req, res) => {
  console.log("req",req.body)
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Please Enter the valid email format");
    } else if (!validator.isStrongPassword(password)) {
      throw new Error(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol "
      );
    }
    //Check if email exists in the database;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      throw new Error("Email Not found, please Sign Up");
    }
    //Decrypt the password
    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);
    if (isPasswordCorrect) {
      //Generating the json webtoken;
      const token = await jwt.sign({ _id: isUser._id }, "Hullur9606@", {
        expiresIn: "10h",
      });
      
      res.cookie("token", token,
        {
          httpOnly:true,
          secure:false,
          sameSite: "lax"

        }
      );
      return res.status(200).send(isUser);
    } else {
      res.status(500).send("Invalid Credentials, please try again later");
    }
  } catch (error) {
    res.status(500).json({message:"Invalid Credentials"});
  }
});

authRouter.post("/logout", async (req, res) => {
  //Remove the cookie then it will logout
  res.cookie("token",null,{
    expires: new Date(Date.now())
  })
  res.status(200).json({message: "User Logout successfully"})
});

module.exports = authRouter;
