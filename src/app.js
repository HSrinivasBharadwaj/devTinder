const express = require('express');
const app = express();
const port = 3000;




app.use("/test",(req,res) => {
    res.send("Hello from test server")
})



app.use("/home",(req,res) => {
    res.send("Hello from home page")
})

app.use("/",(req,res) => {
    res.send("Main route from server")
})

app.listen(port,() => {
    console.log("Listening on port",port)
})