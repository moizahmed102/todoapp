const Createtodo = require("../models/taskModel");

/* const userId = mongoose.Types.ObjectId(req.user.id);

    const totalTasks = await Createtodo.countDocuments({ user: userId });

    const paginatedTasks = await Createtodo.aggregate([
      { $match: { user: userId } }, // Correctly match user ObjectId
      { $skip: page * tasksPerPage },
      { $limit: tasksPerPage },
    ]);*/
const getTasks = async (req, res) => {
  try {
    const page = req.query.p || 0;
    const tasksPerPage = 4;
    const totalTasks = await Createtodo.countDocuments({ user: req.user.id });
    const tasks = await Createtodo.find({ user: req.user.id })
      .skip(page * tasksPerPage)
      .limit(tasksPerPage);

    res.status(200).json({
      status: "Success",
      data: {
        totalTasks,
        tasks,
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

    const task = await Createtodo.findOne({
      _id: taskId,
      user: req.user.id,
    });
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
    const task = await Createtodo.findOne({
      _id: taskId,
      user: req.user.id,
    });
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
