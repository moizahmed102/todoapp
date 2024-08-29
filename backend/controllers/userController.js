const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Createtodo = require("../models/taskModel");

const token = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "20d" });
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    if (!user.name || !user.email || !user.password) {
      return res.status(500).send("fields required");
    }
    await user.save();

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: token(user.id),
    });
  } catch (err) {
    console.log(err);
    res.status(401).send("Signup failed");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send("Invalid password");
    }
    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token(user.id),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = { userSignup, userLogin, getProfile };
