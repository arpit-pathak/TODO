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
router.delete("/deleteTask/:todoId/:taskId", userAuth, deleteTask);
router.put("/updateTask/:taskId", userAuth, updateTask);
router.post("/searchTasks/:todoId", userAuth, searchTasks);

module.exports = router;
