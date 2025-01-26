const express = require('express');
const app = express();
const connectToDB = require('./config/database');
const user = require('./models/user');
const port = 7777;

//Middleware for post request
app.use(express.json())
//Post Request
app.post("/signup",async(req,res) => {
    //Reading the request
    const User = new user(req.body);
    await User.save().then(() => {
        console.log("Data added successfully");
        res.send("User signed up successfully");
    }).catch((error) => {
        console.log("Error adding data: " + error);
        res.status(500).send("Error signing up user");
    })
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
    try {
        const updateUser = await user.findByIdAndUpdate({_id:getUserId},{
            firstName: "John",
            lastName: "Doe",
            emailId: "JohnDoe@email.com",
            password: "testOne",
            age: 21,
            gender: "female"
        })
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

