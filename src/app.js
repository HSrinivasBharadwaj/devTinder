const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const user = require("./models/user");
const { SignUpValidateData } = require("./utils/validation");
const {validateToken} = require('./middleware/auth')
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const port = 7777;

//Middleware for post request
app.use(express.json());
app.use(cookieParser());
//Post Request
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  //Validate the signUp
  SignUpValidateData(req);
  //Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);
  //Reading the request
  const User = new user({
    firstName,
    lastName,
    emailId,
    password: hashedPassword,
  });
  await User.save()
    .then(() => {
      console.log("Data added successfully");
      res.send("User signed up successfully");
    })
    .catch((error) => {
      console.log("Error adding data: " + error);
      res.status(500).send("Error signing up user");
    });
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const findUser = await user.findOne({ emailId: emailId });
    if (!findUser) {
      return res.status(404).send("Email Id not found");
    }
    const isPasswordValid = findUser.comparePassword(password)
    if (isPasswordValid) {
      const token = await findUser.getJwt()
      res.cookie("token", token);
      return res.status(200).send("User login successful");
    } else {
      throw new Error("Password is incorrect");
    }
  } catch (error) {
    res.status(400).send("Error signing up user");
  }
});

//Profile route
app.get("/profile", validateToken,async (req, res) => {
  try {
    const getUser = req.getUser;
    console.log("getUser",getUser)
  } catch (error) {
    res.status(500).send("Error fetching profile");
  }
});

//Send connection Request
app.get("/sendConnectionRequest", validateToken,async (req, res) => {
  try {
    const getUser = req.getUser;
    return res.status(200).send(getUser)
  } catch (error) {
    res.status(500).send("Error fetching profile");
  }
});


connectToDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database" + error);
  });
