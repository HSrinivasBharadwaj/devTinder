const express = require('express');
const {validateAuth} = require('../middlewares/auth');
const connectionRouter = express.Router();


//Send Connection Request
connectionRouter.post("/sendConnectionRequest", validateAuth, async (req, res) => {
  try {
    const user = req.user;
    return res
      .status(200)
      .send(user.firstName + "Send connection successfully");
  } catch (error) {
    res.status(500).send("Failed to fetch the profile data of the user");
  }
});


module.exports = connectionRouter
