const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male","female"].includes(value)) {
                throw new Error("Inavalid gender there are only two genders")
            }
        }
    },
    photoUrl: {
        type:String,
        default: "https://png.pngtree.com/thumb_back/fh260/background/20240909/pngtree-full-screen-mobile-hd-wallpapers-figure-s-stance-image_16134886.jpg"
    },
    about: {
        type: String,
        default:"This is the default profile about"
    },
    skills: {
        type: [String]
    }
},{timestamps:true})

//Jwt Reusable function
UserSchema.methods.getJwt = async function()  {
    const user = this
    const token = await jwt.sign({ _id: user.id }, "AuthToken",{expiresIn: "1h"});
    return token 
}

//Password reusable compare
UserSchema.methods.comparePassword = async function(getInputPassword) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(getInputPassword,passwordHash);
    return isPasswordValid
}

module.exports = mongoose.model("User", UserSchema)