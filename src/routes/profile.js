const express = require('express');
const profileRouter = express.Router();
const validateToken = require('../middleware/auth');
const { validateEditFields } = require('../utils/validation');

profileRouter.get("/profile/view", validateToken, async (req, res) => {
    try {
      const getUser = req.getUser;
      console.log("getUser", getUser);
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
module.exports = profileRouter