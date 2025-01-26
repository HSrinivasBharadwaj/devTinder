const mongoose = require('mongoose');

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

module.exports = mongoose.model("User", UserSchema)