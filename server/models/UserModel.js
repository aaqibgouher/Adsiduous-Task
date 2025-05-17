const mongoose = require("mongoose");
const { MODEL_CONSTANTS } = require("../utils/constant");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// model
const UserModel = mongoose.model(
  MODEL_CONSTANTS.USER.MODEL,
  userSchema,
  MODEL_CONSTANTS.USER.TABLE
);

// exporting model
module.exports = UserModel;
