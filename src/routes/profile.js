const express = require('express');
const profileRouter = express.Router();
const validateToken = require('../middleware/auth');
const { validateEditFields } = require('../utils/validation');
const bcrypt = require('bcrypt');
const validator = require("validator");


profileRouter.get("/profile/view", validateToken, async (req, res) => {
    try {
      const getUser = req.getUser;
    } catch (error) {
      res.status(500).send("Error fetching profile");
    }
});

profileRouter.patch("/profile/edit",validateToken,async(req,res) => {
    try {
        if(!validateEditFields(req)) {
            return res.status(400).send("Edit was not valid")
        }
        const loggedInUser = req.getUser;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])
        await loggedInUser.save()
        res.send(`${loggedInUser.firstName}, your profile has been updated successfully`)
    } catch (error) {
        res.status(500).send("Error Updating profile");
    }
})

profileRouter.patch("/profile/password",validateToken,async(req,res) => {
    try {
        const {newPassword} = req.body;
        const loggedInUser = req.getUser;
        console.log("logged in user",loggedInUser);
        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).send("Password must be at least 8 characters long and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol.")
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        loggedInUser.password = hashedPassword;
        await loggedInUser.save();
        return res.status(200).json({message: "Password updated Successfully"})
    } catch (error) {
        return res.status(500).send("Error while updating" + error)
    }
})
module.exports = profileRouter