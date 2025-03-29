const express = require("express");
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const port = 3000;


app.use(express.json())

//Post Request for adding the data to the database
app.post("/signup",async(req,res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.status(200).send("User Added Successfully")
    } catch (error) {
        res.status(500).send(error)
    } 
})


//Get all users from the database
app.get("/feed",async(req,res) => {
    const findUsers = await User.find({});
    res.status(200).send(findUsers)
})

//Get user by emailId
app.get("/user",async(req,res) => {
    const emailId = req.body.email;
    try {
       const findUser = await User.findOne({email: emailId}) ;
       if (findUser.length === 0) {
            res.status(400).send("Not able to find the user")
       }
       res.status(200).send(findUser)
    } catch (error) {
        res.status(500).send("Not able to find the user")
    }
})

//Delete By ID
app.delete("/user",async(req,res) => {
    const userId = req.body.userId;
    try {
        const deleteUser = await User.findByIdAndDelete({_id:userId});
        res.status(200).send("User deleted Successfully")
    } catch (error) {
        res.status(500).send("Not able to delete the user")
    }
})

//Update the data by Id
app.patch("/user/:userId",async(req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = ["gender","age","skills","photoUrl"];
        const allowUpdate = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!allowUpdate) {
            throw new Error("Update was not allowed")
        }
        if(data.skills.length >=10) {
            throw new Error("Skills cant be more than 10")
        }
        await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
        res.status(200).send("User Updated Successfully")
    } catch (error) {
        res.status(500).send("Not able to update the user")
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

