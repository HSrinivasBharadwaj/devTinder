const express = require('express');
const app = express();



app.get("/user",(req,res) => {
    res.send({firstName: "Srinivas",lastName:"Bharadwaj"})
})


app.post("/user",(req,res) => {
    res.send("User posted successfully")
})


app.delete("/user",(req,res) => {
    res.send("User deleted successfully")
})


app.put("/user",(req,res) => {
    res.send("User updated successfully")
})



//Listening on port
app.listen(7777,() => {
    console.log("Listeningg on port 7777")
})