const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const validator = require('validator');
const { validateSignUpData } = require("./utils/validate");
const port = 3000;

app.use(express.json());

//Post Request for adding the data to the database
app.post("/signup", async (req, res) => {
  validateSignUpData(req.body);
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hashSync(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.status(200).send("User Added Successfully");
  } catch (error) {
    console.log("error in signup", error);
    res.status(500).send(error);
  }
});


//Login api
app.post("/login",async(req,res) => {
    try {
        const {email,password} = req.body;
        if (!validator.isEmail(email)) {
            throw new Error("Please Enter the valid email format")
        }
        else if(!validator.isStrongPassword(password)) {
            throw new Error("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special symbol ")
        }
        //Check if email exists in the database;
        const isUser = await User.findOne({email:email});
        if (!isUser) {
            throw new Error("Email Not found, please Sign Up")
        }
        //Decrypt the password
        const isPasswordCorrect = await bcrypt.compare(password,isUser.password);
        if (isPasswordCorrect) {
            res.status(200).send("Login was successful")
        }
        else {
            res.status(500).send("Invalid Credentials, please try again later")
        }
    } catch (error) {
        console.log("error",error);
        res.status(500).send("Error while logging in")
    }
    
})

//Get all users from the database
app.get("/feed", async (req, res) => {
  const findUsers = await User.find({});
  res.status(200).send(findUsers);
});

//Get user by emailId
app.get("/user", async (req, res) => {
  const emailId = req.body.email;
  try {
    const findUser = await User.findOne({ email: emailId });
    if (findUser.length === 0) {
      res.status(400).send("Not able to find the user");
    }
    res.status(200).send(findUser);
  } catch (error) {
    res.status(500).send("Not able to find the user");
  }
});

//Delete By ID
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: userId });
    res.status(200).send("User deleted Successfully");
  } catch (error) {
    res.status(500).send("Not able to delete the user");
  }
});

//Update the data by Id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["gender", "age", "skills", "photoUrl"];
    const allowUpdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!allowUpdate) {
      throw new Error("Update was not allowed");
    }
    if (data.skills.length >= 10) {
      throw new Error("Skills cant be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.status(200).send("User Updated Successfully");
  } catch (error) {
    res.status(500).send("Not able to update the user");
  }
});

connectDB()
  .then(() => {
    console.log("Data base connected successfully");
    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });
