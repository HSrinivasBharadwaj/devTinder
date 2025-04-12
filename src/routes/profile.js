const express = require('express');
const {validateEditProfileData} = require('../utils/validate');
const {validateAuth} = require('../middlewares/auth');
const validator = require('validator')
const bcrypt = require('bcrypt')
const profileRouter = express.Router();

profileRouter.get("/profile",validateAuth, async (req, res) => {
    try {
      //Read the token
      const user = req.user;
      return res.status(200).send(user)
    } catch (error) {
      return res.status(500).send("Failed to fetch the profile data of the user")
    }
})

profileRouter.patch("/profile/edit",validateAuth,async(req,res) => {
    try {
        if (!validateEditProfileData(req.body)) {
            return res.status(400).json({message: "Edit was not allowed"})
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(field => loggedInUser[field] = req.body[field])
        await loggedInUser.save()
        return res.status(201).json({message: "User Updated Successfully",data:loggedInUser})
    } catch (error) {
        return res.status(500).json({message: "Error"+ error})
    }
    
})

profileRouter.patch("/profile/forgotPassword",validateAuth,async(req,res) => {
    try {
        const loggedInUser = req.user;
        console.log("log",loggedInUser)
        const newPassword = req.body.password; 
        if(!newPassword || !validator.isStrongPassword(newPassword)) {
            return res.status(400).json({
                message:
                  "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol",
              });
        }
        const updatedHashedPassword = await bcrypt.hash(newPassword,10);
        loggedInUser.password = updatedHashedPassword;
        await loggedInUser.save()
        return res.status(200).json({message: "Password Updated Successfully"})
    } catch (error) {
        console.log("error",error)
        res.status(500).json({message: "Not able to update the password"})
    }
})






module.exports = profileRouter