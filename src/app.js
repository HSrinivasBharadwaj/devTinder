const express = require("express");
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const port = 3000;

//Post Request for adding the data to the database
app.post("/signup",async(req,res) => {
    const user = new User({
        firstName: "Srinivas",
        lastName: "Bharadwaj",
        email: "srinivas@email.com",
        password: "Hullur9606@",
        gender: "male",
        age: 30
    })
    try {
        await user.save();
        res.status(200).send("User Added Successfully")
    } catch (error) {
        res.status(500).send("Error while adding the data to the database")
    } 
})

connectDB().then(() => {
    console.log("Data base connected successfully")
    app.listen(port, () => {
        console.log("Listening on port", port);
      });    
}).catch((error) => {
    console.log("Error",error)
})

