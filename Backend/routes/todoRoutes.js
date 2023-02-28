const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");

const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  searchTodos,
} = require("../controllers/todoControllers");

// Routes for Todo
router.post("/createTodo", userAuth, createTodo);
router.get("/getTodos", userAuth, getTodos);
router.delete("/deleteTodo/:todoId", userAuth, deleteTodo);
router.put("/updateTodo/:todoId", userAuth, updateTodo);
router.post("/searchTodos", userAuth, searchTodos);

module.exports = router;
