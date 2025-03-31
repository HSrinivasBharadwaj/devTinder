const express = require('express');
const {validateAuth} = require('../middlewares/auth');
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

module.exports = profileRouter