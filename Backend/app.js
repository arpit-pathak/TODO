require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("You are on Home route");
});

module.exports = app;
