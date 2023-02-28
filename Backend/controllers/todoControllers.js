const User = require("../model/userSchema");
const Todo = require("../model/TodoSchema");

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks, userId } = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: "Title is mandatory" });
      return;
    }
    const data = { title, tasks, user: userId };

    // Create todo
    const todo = await Todo.create(data);
    console.log(todo);

    // Push Id to User schema
    const result = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { todos: todo._id } }
    );

    res.status(200).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
    return;
  }
};

exports.getTodos = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).populate("todos");
    console.log(user);

    const todos = user.todos;

    if (!todos) {
      res.status(400).json({ success: false, message: "Can not get todos" });
    }

    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const userId = req.body.userId;
    const todoId = req.params.todoId;
    const deleteTodo = await Todo.findByIdAndDelete({ _id: todoId });
    const deleteFromUser = await User.updateOne(
      { _id: userId },
      { $pull: { todos: todoId } }
    );
    res.status(200).json({
      success: true,
      message: "Todo deleted from DB",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
