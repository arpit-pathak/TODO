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

exports.updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const data = {
      title: req.body.title,
    };

    const updateTodo = await Todo.findByIdAndUpdate({ _id: todoId }, data);

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    console.log(error);
    req.status(400).json({
      success: false,
      message: "Todo update failed",
    });
  }
};

exports.searchTodos = async (req, res) => {
  try {
    const userId = req.body.userId;
    let search = req.body.search;

    const todos = await Todo.find({
      $or: [{ title: new RegExp(search, "i") }],
    });
    console.log(todos);

    if (!todos) {
      return res
        .status(400)
        .json({ success: false, message: "Todo not found" });
    }

    let filterTodos = todos.filter((todo) => {
      if (todo.user.equals(userId) === true) return todo;
    });

    if (filterTodos.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "Todo not found" });
    }

    res.status(200).json({ success: true, todos: filterTodos });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in response route" });
  }
};
