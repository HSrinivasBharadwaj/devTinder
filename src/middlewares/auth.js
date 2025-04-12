const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateAuth = async(req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).json({message: "Unauthorized"})
    }
    const decodedObj = jwt.verify(token, "Hullur9606@");
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error",error)
    return res.status(500).send("Failed to authenticate the user");
  }
};

module.exports = { validateAuth };
