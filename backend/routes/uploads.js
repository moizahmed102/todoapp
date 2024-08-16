const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (cb) {
    cb(null, "uploads/");
  },
  filename: function (file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

router.post("/upload/single", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (err) {
    res.status(500).json({
      message: "File upload failed",
      error: err.message,
    });
  }
});

router.post("/upload/multiple", upload.array("files", 5), (req, res) => {
  try {
    res.status(200).json({
      message: "Files uploaded successfully",
      files: req.files,
    });
  } catch (err) {
    res.status(500).json({
      message: "File upload failed",
      error: err.message,
    });
  }
});

module.exports = router;
