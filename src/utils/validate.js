const validator = require("validator");
const validateSignUpData = async (data) => {
  const { firstName, lastName, email, password } = data;
  if (!firstName || !lastName) {
    throw new Error("First Name and Last Name are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Please enter valid email format");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol"
    );
  }
};

const validateEditProfileData = async(data) => {
    console.log("data",data)
    const ALLOWED_UPDATES = ["firstName","lastName","skills","about","photoUrl"];
    const isEditAllowed = Object.keys(data).every((field) => ALLOWED_UPDATES.includes(field));
    console.log(isEditAllowed)
    return isEditAllowed
}

module.exports = { validateSignUpData,validateEditProfileData };
