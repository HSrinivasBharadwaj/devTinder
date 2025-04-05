const express = require("express");
const { validateAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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
    return res.status(200).json({
      message: "Fetched the connection requests",
      fetchConnectionRequests,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching the connection requests", error });
  }
});

userRouter.get("/user/connections", validateAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const findConnections = await connectionRequest
      .find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", ["firstName", "lastName", "about", "photoUrl"])
      .populate("toUserId", ["firstName", "lastName", "about", "photoUrl"]);
    const getData = findConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    return res
      .status(200)
      .json({ message: "Connection Requests are", getData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while fetching the connection requests", error });
  }
});

userRouter.get("/user/feed", validateAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit
    const findConnectionRequests = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");
    const hideConnectionRequests = new Set();
    findConnectionRequests.forEach((req) => {
      hideConnectionRequests.add(req.fromUserId.toString());
      hideConnectionRequests.add(req.toUserId.toString());
    });
    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideConnectionRequests) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select("firstName lastName about photoUrl").skip(skip).limit(limit)
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while fetching the data" });
  }
});

module.exports = userRouter;
