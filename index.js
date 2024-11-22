const express = require("express");
const { connectMongoDb } = require("./connection");

const app = express();


const { logReqRes } = require("./middlewares/");
const userRouter = require('./routes/user');

const PORT = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/developer").then (() => 
  console.log("connection established")
);

app.use(express.urlencoded({ extended  : false}));

app.use(logReqRes("log.txt"));

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});