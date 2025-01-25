const express = require('express');
const app = express();
const connectToDB = require('./config/database');
const user = require('./models/user');
const port = 7777;

//Middleware for post request
app.use(express.json())
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

connectToDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port,() => {
        console.log("Listening on port " + port)
    })
}).catch((error) => {
    console.log("Error connecting to database"+error)
})

