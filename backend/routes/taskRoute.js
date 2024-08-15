const express = require("express");
const router = express.Router();

const {
  getTasks,
  updateTasks,
  postTasks,
  deleteTasks,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authmiddleware");

// Protect all task routes
router.use(authMiddleware);

router.get("/", getTasks);

router.post("/", postTasks);

router.put("/:id", updateTasks);

router.delete("/:id", deleteTasks);

module.exports = router;
