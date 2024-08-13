const express = require("express");
const router = express.Router();
const Createtodo = require("../models/taskModel");

router.get("/", async (req, res) => {
  try {
    const tasks = await Createtodo.find();
    res.status(200).json({
      status: "Success",
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newtask = await Createtodo.create({
      task: req.body.task,
    });
    res.status(200).json(newtask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Createtodo.findByIdAndUpdate(
      taskId,
      { task: req.body.task },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      status: "Success",
      data: {
        task: updatedTask,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Createtodo.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      status: "Success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
