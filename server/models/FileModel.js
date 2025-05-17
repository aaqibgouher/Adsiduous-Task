const mongoose = require("mongoose");
const { MODEL_CONSTANTS } = require("../utils/constant");

// file schema
const fileSchema = new mongoose.Schema(
  {
    file_name: {
      type: String,
      required: true,
    },
    file_type: {
      type: String,
      required: true,
    },
    size: { type: Number, required: true },
    tags: [String],
    user: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.USER.MODEL,
      required: true,
    },
    view_count: {
      type: Number,
      default: 0,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

// model
const FileModel = mongoose.model(
  MODEL_CONSTANTS.FILE.MODEL,
  fileSchema,
  MODEL_CONSTANTS.FILE.TABLE
);

// exporting model
module.exports = FileModel;
