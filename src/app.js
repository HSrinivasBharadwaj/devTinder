const express = require('express');
const app = express();
const connectToDB = require('./config/database');
const port = 7777;

connectToDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port,() => {
        console.log("Listening on port " + port)
    })
}).catch((error) => {
    console.log("Error connecting to database")
})

