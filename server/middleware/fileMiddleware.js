const multer = require("multer");
const { MESSAGE_CONSTANTS } = require("../utils/constant");

// Store in memory before uploading to Cloudinary
const storage = multer.memoryStorage();

// Multer instance
const upload = multer({ storage });

module.exports = {
  upload,
};
