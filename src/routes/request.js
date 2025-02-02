const express = require('express');
const requestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const validateToken = require('../middleware/auth')

requestRouter.post("/request/send/:status/:toUserId", validateToken,async(req,res) => {
  try {
    const loggedInUser = req.getUser;
    const fromUserId = loggedInUser._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const allowedStatus = ["interested","ignored"];
    if (!allowedStatus.includes(status)) {
      return res.status(403).json({message: "Invalid status"+ status})
    }
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })
    if (existingConnectionRequest) {
      return res.status(400).json({message: "Already connected cant send request"})
    }
    const findUserId = await ConnectionRequest.findById(toUserId);
    if (!findUserId) {
      return res.status(404).json({message: "User not found"})
    }
    //fromUserId to fromUserId
    if (fromUserId.toString() === toUserId.toString()) {
      return res.status(400).json({ message: "Cannot send the request to yourself" });
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })
    const data = await connectionRequest.save();
    return res.status(200).json({message: "Request sent successfully",data})
  } catch (error) {
    return res.status(400).send("error"+error)
  }
})
module.exports = requestRouter


