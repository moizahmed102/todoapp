const Createtodo = require("../models/taskModel");
const mongoose = require("mongoose");

const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const tasksPerPage = 10;
    const skip = page * tasksPerPage;

    const matchCondition =
      req.user.role === "admin"
        ? {}
        : { user: mongoose.Types.ObjectId.createFromHexString(req.user.id) };

    const [result] = await Createtodo.aggregate([
      { $match: matchCondition },
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          tasks: [{ $skip: skip }, { $limit: tasksPerPage }],
        },
      },
      {
        $project: {
          totalTasks: { $arrayElemAt: ["$totalCount.count", 0] },
          tasks: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "Success",
      data: {
        totalTasks: result.totalTasks || 0,
        tasks: result.tasks || [],
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const postTasks = async (req, res) => {
  try {
    const newtask = await Createtodo.create({
      task: req.body.task,
      user: req.user.id,
    });
    res.status(200).json(newtask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTasks = async (req, res) => {
  try {
    const taskId = req.params.id;
    const query =
      req.user.role === "admin"
        ? { _id: taskId }
        : { _id: taskId, user: req.user.id };

    const task = await Createtodo.findOne(query);
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }

    task.task = req.body.task;
    const updatedTask = await task.save();

    res.status(200).json({
      status: "Success",
      data: {
        task: updatedTask,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const taskId = req.params.id;
    const query =
      req.user.role === "admin"
        ? { _id: taskId }
        : { _id: taskId, user: req.user.id };
    const task = await Createtodo.findOne(query);
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }

    await Createtodo.findByIdAndDelete(taskId);

    res.status(200).json({
      status: "Success",
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { getTasks, updateTasks, postTasks, deleteTasks };
