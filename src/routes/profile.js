const express = require('express');
const profileRouter = express.Router();
const validateToken = require('../middleware/auth')

profileRouter.get("/profile", validateToken, async (req, res) => {
    try {
      const getUser = req.getUser;
      console.log("getUser", getUser);
    } catch (error) {
      res.status(500).send("Error fetching profile");
    }
});
module.exports = profileRouter