const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
      maxLength: [30, "Maximum length of title is 30 charecters"],
    },
    tasks: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
