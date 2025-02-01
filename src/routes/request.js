const express = require('express');
const requestRouter = express.Router();
const validateToken = require('../middleware/auth')

requestRouter.get("/sendConnectionRequest", validateToken, async (req, res) => {
    try {
      const getUser = req.getUser;
      return res.status(200).send(getUser);
    } catch (error) {
      res.status(500).send("Error fetching profile");
    }
  });
module.exports = requestRouter