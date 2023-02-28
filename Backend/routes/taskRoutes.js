const express = require("express");
const router = express.Router();
const userAuth = require("../middleware/auth");

const {
  createTask,
  getTodoById,
  deleteTask,
  updateTask,
  searchTasks,
} = require("../controllers/taskControllers");

// Routes for Tasks
router.put("/createTask/:todoId", userAuth, createTask);
router.get("/getTodoById/:todoId", userAuth, getTodoById);

module.exports = router;
