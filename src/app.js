const express = require('express');
const app = express();
const connectToDB = require('./config/database');
const user = require('./models/user');
const port = 7777;

app.post("/signup",async(req,res) => {
    const userObject = {
        firstName: "Tharun",
        lastName: "Kiran",
        emailId: "tharun@gmail.com",
        password: "testone",
        age: 25,
        gender: "male"
    }
    const User = new user(userObject);
    await User.save().then(() => {
        console.log("Data added successfully");
        res.send("User signed up successfully");
    }).catch((error) => {
        console.log("Error adding data: " + error);
        res.status(500).send("Error signing up user");
    })
})

connectToDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port,() => {
        console.log("Listening on port " + port)
    })
}).catch((error) => {
    console.log("Error connecting to database"+error)
})

