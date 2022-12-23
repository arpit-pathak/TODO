require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./config/database");

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connecting application to database
connectToDB();

app.get("/", (req, res) => {
  res.send("You are on Home route");
});

module.exports = app;
