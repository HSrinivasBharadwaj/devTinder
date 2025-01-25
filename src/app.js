const express = require('express');
const app = express();
const port = 7777;

app.use("/hello",(req,res) => {
    res.send("Hello from server")
})
app.listen(port,() => {
    console.log("Listening on port " + port)
})