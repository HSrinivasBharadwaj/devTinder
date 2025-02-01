const express = require('express');
const user = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const { SignUpValidateData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  //Validate the signUp
  SignUpValidateData(req);
  //Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);
  //Reading the request
  const User = new user({
    firstName,
    lastName,
    emailId,
    password: hashedPassword,
  });
  await User.save()
    .then(() => {
      console.log("Data added successfully");
      res.send("User signed up successfully");
    })
    .catch((error) => {
      console.log("Error adding data: " + error);
      res.status(500).send("Error signing up user");
    });
});

authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const findUser = await user.findOne({ emailId: emailId });
      if (!findUser) {
        return res.status(404).send("Email Id not found");
      }
      const isPasswordValid = findUser.comparePassword(password)
      if (isPasswordValid) {
        const token = await findUser.getJwt()
        res.cookie("token", token);
        return res.status(200).send("User login successful");
      } else {
        throw new Error("Password is incorrect");
      }
    } catch (error) {
      res.status(400).send("Error signing up user");
    }
  });

module.exports = authRouter;