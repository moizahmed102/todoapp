const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const Createtodo = mongoose.model("Createtodo", taskSchema);
module.exports = Createtodo;
