const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["accepted","rejected","ignored","interested"],
            message: `{VALUE} is incorrect status type`
        }
    }
},{timestamps: true})

module.exports = mongoose.model("ConnectionRequest",ConnectionRequestSchema)