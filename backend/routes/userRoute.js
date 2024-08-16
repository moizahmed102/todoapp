const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  getProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;
