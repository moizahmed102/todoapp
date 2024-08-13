const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);
const port = process.env.PORT || 3000;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(port, () => {
  console.log(`Server started on ${port} `);
});
