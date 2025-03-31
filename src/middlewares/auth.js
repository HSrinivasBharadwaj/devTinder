const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateAuth = async(req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is not Valid");
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
    return res.status(500).send("Failed to authenticate the user");
  }
};

module.exports = { validateAuth };
