const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { use } = require("../routes/taskRoute");

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
      usertoken: token(user.id),
    });
  } catch (err) {
    console.log(err);
    res.status(401).send("Signup failed");
  }
};

const userLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) {
      res.status(500).send("user not found");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(500).send("password not found");
    }
    if (user) {
      res
        .status(201)
        .json({
          _id: user.id,
          name: user.name,
          email: user.email,
          usertoken: token(user.id),
        });
    }
  } catch (err) {
    res.status(500).send("Login failed");
  }
};

module.exports = { userSignup, userLogin };
