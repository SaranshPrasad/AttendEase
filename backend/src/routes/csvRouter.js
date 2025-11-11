const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const MasterStudent = require("../models/master_students");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/upload", upload.single("file"), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        await MasterStudent.insertMany(results);
        res.json({ message: "Students uploaded successfully!" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error inserting students" });
      }
    });
});

module.exports = router;
