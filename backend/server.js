const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);
const port = process.env.PORT || 3000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/tasks", taskRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Server started on ${port} `);
});
