const mongoose = require('mongoose');
const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: {
            values: ["interested","ignored","accepted","rejected"],
            // message: `${value} is incorrect status type`
        }
    }
},{timestamps:true})

module.exports = mongoose.model("ConnectionRequest",ConnectionRequestSchema)