const express = require('express');
const app = express();
const port = 7777;

app.use("/user",(req,res) => {
    res.send("Helllo")
})

app.get("/user",(req,res) => {
    res.send("Hello srinivas")
})

app.post("/user",(req,res) => {
    res.send("Data poste")
})

app.delete("/user",(req,res) => {
    res.send("Data Deleted Successfully")
})

app.put("/user",(req,res) => {
    res.send("Data updated successfully")
})


app.listen(port,() => {
    console.log("Listening on port " + port)
})