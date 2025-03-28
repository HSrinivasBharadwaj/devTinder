const express = require("express");
const app = express();
const port = 3000;

app.use(
  "/user",
  (req, res, next) => {
    console.log("Hello user");
    next();
  },
  (req, res,next) => {
    console.log("Hello from second route");
    // res.send("Sending the response from second route handler");
    next();
  },
  (req, res,next) => {
    console.log("Hello from third route");
    // res.send("Sending the response from third route handler");
    next();
  },
  (req, res,next) => {
    console.log("Hello from fourth route");
    res.send("Sending the response from fourth route handler");
  }
);

app.listen(port, () => {
  console.log("Listening on port", port);
});
