const express = require('express');
const {validateAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const connectionRouter = express.Router();


//Send Connection Request
connectionRouter.post("/request/sendConnectionRequest/:status/:touserId", validateAuth, async (req, res) => {
  try {
    const user = req.user;
    const fromUserId = user._id;
    const toUserId = req.params.touserId;
    const status = req.params.status
    //Create a instance of the model
    const ALLOWED_STATUS = ["interested","ignored"];
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({message: "Invalid Status Type"})
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    })

    //If i already send connection Request to B should not send again
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })

    if (existingConnectionRequest) {
      return res.status(400).json({message: "Connection Request Already Sent"})
    }

    const findUserId = await ConnectionRequest.findById(toUserId);
    if (!findUserId) {
      return res.status(400).json({message: "Invalid User Id"})
    }
    

    //I should not send connectionRequest to myself
    if (fromUserId.equals(toUserId)) {
      return res.status(500).json({message: "Cant Send request to yourself"})
    }
    
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
