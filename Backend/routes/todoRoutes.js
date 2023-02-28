const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");

const { createTodo } = require("../controllers/todoControllers");

// Routes for Todo
router.post("/createTodo", userAuth, createTodo);

module.exports = router;
