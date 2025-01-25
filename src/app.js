const express = require('express');
const app = express();
const port = 7777;



app.use("/home",(req,res) => {
    res.send("Hello from server")
})


app.use("/home/123",(req,res) => {
    res.send("Home route")
})

app.use("/",(req,res) => {
    res.send("Hello from home route")
})
app.listen(port,() => {
    console.log("Listening on port " + port)
})