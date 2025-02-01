const jwt = require('jsonwebtoken');
const user = require('../models/user');
const validateToken = async(req,res,next) => {
    try {
        const cookie = req.cookies;
        const {token} = cookie;
        if (!token) {
            throw new Error("Invalid token")
        }
        const decodedObj = await jwt.verify(token, "AuthToken");
        const {_id} = decodedObj;
        const getUser = await user.findById({_id:_id});
        if (!getUser) {
            res.status(404).send("User not found")
        }
        req.getUser = getUser;
        next()
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = validateToken
