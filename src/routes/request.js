const express = require("express");
const { validateAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');
const connectionRouter = express.Router();

//Send Connection Request
connectionRouter.post(
  "/request/sendConnectionRequest/:status/:touserId",
  validateAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.touserId;
      const status = req.params.status;
      //Create a instance of the model
      const ALLOWED_STATUS = ["interested", "ignored"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({ message: "Invalid Status Type" });
      }
       //If i already send connection Request to B should not send again
       const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection Request Already Sent" });
      }

      const findUserId = await User.findById(toUserId);
      if (!findUserId) {
        return res.status(400).json({ message: "Invalid User Id" });
      }

      //I should not send connectionRequest to myself
      if (fromUserId.equals(toUserId)) {
        return res
          .status(500)
          .json({ message: "Cant Send request to yourself" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });


      await connectionRequest.save();
      return res
        .status(200)
        .send(user.firstName + "Send connection successfully");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Failed to fetch the profile data of the user");
    }
  }
);

//Review connection Request
connectionRouter.post(
  "/request/review/:status/:requestId",
  validateAuth,
  async (req, res) => {
    const loggedInUser = req.user;
    const status = req.params.status;
    const requestId = req.params.requestId;
    try {
      const ALLOWED_STATUS = ["accepted","rejected"];
      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({message: "Invalid status type"})
      }
      const findConnectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested"
      })
      if (!findConnectionRequest) {
        return res.status(400).json({message: "Connection Request was not found"})
      }
      findConnectionRequest.status = status;
      await findConnectionRequest.save();
      return res.status(200).json({message: "Accepted the request successfully"})
    } catch (error) {
      console.log(error)
      return res.status(500).json({message: "Error"})
    }
  }
);

module.exports = connectionRouter;
