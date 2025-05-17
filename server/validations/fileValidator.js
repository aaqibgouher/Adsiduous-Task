const Joi = require("joi");

const allowedMimePatterns = [
  /^image\/.*/, // Matches image/jpeg, image/png, image/svg+xml etc.
  /^video\/.*/, // Matches video/mp4, video/webm etc.
  /^audio\/.*/, // Matches audio/mpeg, audio/wav etc.
  /^application\/pdf$/, // Only application/pdf
];

const getFiles = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
  search: Joi.string().allow(null, "").default("").messages({
    "string.base": "Search must be a string",
  }),
  sortBy: Joi.string().allow(null, "").default("").messages({
    "string.base": "Search must be a string",
  }),
});

const uploadFile = Joi.object({
  originalname: Joi.string().required().messages({
    "any.required": "File name is required",
  }),
  mimetype: Joi.string()
    .pattern(new RegExp(allowedMimePatterns.map((p) => p.source).join("|")))
    .required()
    .messages({
      "string.pattern.base": `MIME type must be one of: image/*, video/*, audio/*, or application/pdf`,
      "any.required": "MIME type is required",
    }),
  buffer: Joi.binary().required().messages({
    "any.required": "File buffer is missing",
  }),
  size: Joi.number()
    .max(10 * 1024 * 1024) // 10MB
    .messages({
      "number.max": "File size must be less than or equal to 5MB",
    }),
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
  fieldname: Joi.string().default(""),
  encoding: Joi.string().default(""),
  tags: Joi.string().allow(null, "").default("").messages({
    "string.base": "Tags must be a string",
  }),
});

const getFile = Joi.object({
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
});

module.exports = {
  getFiles,
  uploadFile,
  getFile,
};
