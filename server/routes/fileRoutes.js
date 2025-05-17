const express = require("express");
const fileController = require("../controller/fileController");
const fileMiddleware = require("../middleware/fileMiddleware");

const router = express.Router();

// get files
router.get("/", fileController.getFiles);

// upload
router.post(
  "/",
  fileMiddleware.upload.single("file"),
  fileController.uploadFile
);

// get file
router.get("/:fileId", fileController.getFile);

module.exports = router;
