const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth');
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const port = 7777;

//Middleware for post request
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)



connectToDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch((error) => {
    console.log("Error connecting to database" + error);
  });
