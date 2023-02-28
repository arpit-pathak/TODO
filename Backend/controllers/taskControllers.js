const User = require("../model/userSchema");
const Todo = require("../model/TodoSchema");

exports.createTask = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const { task } = req.body;

    const data = {
      task,
      taskCreatedAt: Date.now(),
      taskUpdatedAt: Date.now(),
    };

    // Find todo by id
    const todo = await Todo.updateOne(
      { _id: todoId },
      { $push: { tasks: data } }
    );

    res.status(200).json({
      success: true,
      message: "Task added Successfully",
      task,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ success: false, message: "Error in adding task to DB" });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;

    const user = await User.findById({ _id: userId }).populate("todos");

    const todo = user.todos.filter((todo) => todo._id == todoId);
    console.log(todo);

    if (!todo || todo.length === 0) {
      res.status(400).json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in response route" });
  }
};
