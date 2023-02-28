const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");

const {
  createTodo,
  getTodos,
  deleteTodo,
} = require("../controllers/todoControllers");

// Routes for Todo
router.post("/createTodo", userAuth, createTodo);
router.get("/getTodos", userAuth, getTodos);
router.delete("/deleteTodo/:todoId", userAuth, deleteTodo);

module.exports = router;
