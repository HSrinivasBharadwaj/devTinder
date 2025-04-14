const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const port = 7777;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const connectionRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",connectionRouter);
app.use("/",userRouter)

connectDB()
  .then(() => {
    console.log("Data base connected successfully");
    app.listen(port, () => {
      console.log("Listening on port", port);
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });
