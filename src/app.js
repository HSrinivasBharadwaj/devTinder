const express = require("express");
const app = express();
const port = 3000;
const {isAdminAuth} = require('./middlewares/auth')

app.use("/admin/getAllUserData",isAdminAuth,async(req,res) => {
   res.status(200).send("Data fetched successfully") 
})

app.listen(port, () => {
  console.log("Listening on port", port);
});
