const mongoose = require("mongoose");

const tasksSchema = mongoose.Schema({
  task: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  isImportant: {
    type: Boolean,
    default: false,
  },
  taskCreatedAt: { type: Date },
  taskUpdatedAt: { type: Date, default: Date.now() },
});

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [30, "Maximum length of title is 30 charecters"],
    },
    tasks: [tasksSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
