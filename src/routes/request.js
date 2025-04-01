const express = require('express');
const {validateAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const connectionRouter = express.Router();


//Send Connection Request
connectionRouter.post("/request/sendConnectionRequest/:status/:touserId", validateAuth, async (req, res) => {
  try {
    const user = req.user;
    const fromUserId = user._id;
    console.log(fromUserId)
    const toUserId = req.params.touserId;
    const status = req.params.status
    //Create a instance of the model
    //should not allow accepted,rejected
    const ALLOWED_STATUS = ["interested","ignored"];
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })
    //if connection already exists from a to b,dont send
    //b to a should not send
    //Should not send from to from
    
    await connectionRequest.save()
    return res
      .status(200)
      .send(user.firstName + "Send connection successfully");
  } catch (error) {
    console.log("error",error)
    res.status(500).send("Failed to fetch the profile data of the user");
  }
});


module.exports = connectionRouter
