require("dotenv").config();
const express = require("express");
const app = express();
const connectToDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const tasksRoutes = require("./routes/taskRoutes");
// Express middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connecting application to database
connectToDB();

app.get("/", (req, res) => {
  res.send("You are on Home route");
});

// Routes
app.use("/api", userRoutes);
app.use("/todo", todoRoutes);
app.use("/todo/tasks", tasksRoutes);

module.exports = app;
