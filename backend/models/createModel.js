const mongoose = require("mongoose");

const createSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const Createtodo = mongoose.model("Create", createSchema);
module.exports = Createtodo;
