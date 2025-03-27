const express = require('express');
const app = express();
const port = 3000;


app.use("/",(req,res) => {
    res.send("Hello from main route")
})

app.use("/test/123",(req,res) => {
    res.send("Hello from test routes")
})

app.use("/test",(req,res) => {
    res.send("Hello from test route")
})

app.use("/home",(req,res) => {
    res.send("Hello from home route")
})



app.listen(port,() => {
    console.log("Listening on port",port)
})