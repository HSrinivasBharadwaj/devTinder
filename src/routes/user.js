const express = require("express");
const { validateAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

userRouter.get("/user/requests/received", validateAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const fetchConnectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName", "about", "photoUrl"]);
    return res
      .status(200)
      .json({
        message: "Fetched the connection requests",
        fetchConnectionRequests,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching the connection requests", error });
  }
});

module.exports = userRouter;
