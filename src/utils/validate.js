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

module.exports = { validateSignUpData };
