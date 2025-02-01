const validator = require("validator");
const SignUpValidateData = async (req) => {
  console.log("req", req.body);
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Invalid first name or last name");
  } else if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!password || !validator.isStrongPassword(password)) {
    throw new Error("Password was not strong enough");
  }
};

const validateEditFields = async (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "emailId",
    "gender",
    "age",
    "about",
    "photoUrl",
    "about",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { SignUpValidateData, validateEditFields };
