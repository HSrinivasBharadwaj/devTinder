const express = require('express');
const app = express();
const connectToDB = require('./config/database');
const user = require('./models/user');
const {SignUpValidateData} = require('./utils/validation');
const bcrypt = require('bcrypt');
const port = 7777;

//Middleware for post request
app.use(express.json())
//Post Request
app.post("/signup",async(req,res) => {
    const {firstName,lastName,emailId,password} = req.body
    //Validate the signUp
    SignUpValidateData(req);
    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password,10)
    //Reading the request
    const User = new user({
        firstName,
        lastName,
        emailId,
        password: hashedPassword
    });
    await User.save().then(() => {
        console.log("Data added successfully");
        res.send("User signed up successfully");
    }).catch((error) => {
        console.log("Error adding data: " + error);
        res.status(500).send("Error signing up user");
    })
})


app.post("/login",async(req,res) => {
    
    try {
        const {emailId,password} = req.body;
        const findUser = await user.findOne({emailId: emailId});
        if (!findUser) {
           return res.status(404).send("Email Id not found") 
        }
        const isPasswordValid = bcrypt.compare(password,findUser.password);
        if (isPasswordValid) {
            return res.status(200).send("User login successful")
        }
        else {
            throw new Error("Password is incorrect")
        }
    } catch (error) {
        res.status(400).send("Error signing up user");
    }
})

//Get Request for all users
app.get("/feed",async(req,res) => {
    try {
        const getAllUsers = await user.find({});
        res.status(200).send(getAllUsers)
    } catch (error) {
        res.status(404).send("Not able to get the users")
    }

})

//Get Request by Email Id
app.get("/user",async(req,res) => {
    const emailId = req.body.emailId;
    try {
        const getUserByEmail = await user.find({emailId: emailId});
        return res.status(200).send(getUserByEmail)
    } catch (error) {
        res.status(401).send("Not able to find user by email")
    }
})

//Delete By Id
app.delete("/user",async(req,res) => {
    const getUserId = req.body._id;
    try {
        const deleteUser = await user.findByIdAndDelete({_id: getUserId});
        return res.status(200).send(deleteUser)
    } catch (error) {
        res.status(401).send("Not able to delete user")
    }
})

//Delete All
app.delete("/users",async(req,res) => {
    try {
        const deleteUsers = await user.deleteMany();
        return res.status(200).send(deleteUsers)
    } catch (error) {
        res.status(401).send("Deleted All the users")
    }
})

//Update By Id
app.patch("/user",async(req,res) => {
    const getUserId = req.body._id;
    const data = req.body;
    const ALLOWED_UPDATES = ["firstName","lastName","password","gender"];
    const allow = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
    if (!allow) {
        throw new Error("Update not allowed")
    }
    try {
        const updateUser = await user.findByIdAndUpdate({_id:getUserId},{
            firstName: "John",
            lastName: "Doe",
            emailId: "JohnDoe@email.com",
            password: "testOne",
            age: 21,
            gender: "female"
        },{runValidators:true})
        return res.status(200).send(updateUser)
    } catch (error) {
        return res.status(404).send("Not able to update the user")
    }
})


connectToDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port,() => {
        console.log("Listening on port " + port)
    })
}).catch((error) => {
    console.log("Error connecting to database"+error)
})

