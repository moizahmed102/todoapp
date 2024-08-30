const express = require("express");
const router = express.Router();

const {
  getTasks,
  updateTasks,
  postTasks,
  deleteTasks,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authmiddleware");
const authAdmin = require("../middleware/authAdmin");

router.use(authMiddleware);
router.use(authAdmin);

router.get("/admin", getTasks);

router.get("/", getTasks);

router.post("/", postTasks);

router.put("/:id", updateTasks);

router.delete("/:id", deleteTasks);

module.exports = router;
