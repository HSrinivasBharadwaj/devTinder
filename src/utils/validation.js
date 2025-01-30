const validator = require('validator');
const SignUpValidateData = async(req) => {
    console.log("req",req.body)
    const {firstName,lastName,emailId,password} = req.body;
    if(!firstName || !lastName) {
        throw new Error("Invalid first name or last name")
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Invalid email")
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Password was not strong enough")
    }
}

module.exports = {SignUpValidateData}