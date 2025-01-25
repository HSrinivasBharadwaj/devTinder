const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: Number
    },
})

module.exports = mongoose.model("User", UserSchema)