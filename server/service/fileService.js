const fileValidator = require("../validations/fileValidator");
const { v2: cloudinary } = require("cloudinary");
const { Readable } = require("stream");
require("dotenv").config();
const fileRepository = require("../repository/fileRepository");
const { MESSAGE_CONSTANTS } = require("../utils/constant");
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    Readable.from(buffer).pipe(stream);
  });
};

const getFiles = async (payload) => {
  // validation
  const { error, value } = fileValidator.getFiles.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { userId, search, sortBy } = payload;

  // creating pipelines
  const pipeline = [];

  // Match by user
  pipeline.push({
    $match: { user: new mongoose.Types.ObjectId(userId) },
  });

  // If search term is present
  if (search) {
    const regex = new RegExp(search, "i");

    pipeline.push({
      $match: {
        $or: [
          { file_name: { $regex: regex } },
          { tags: { $elemMatch: { $regex: regex } } },
        ],
      },
    });
  }

  // Sorting logic
  let sortStage = {};
  switch (sortBy) {
    case "view":
      sortStage = { view_count: -1 };
      break;
    case "recent":
      sortStage = { createdAt: -1 };
      break;
    default:
      sortStage = { createdAt: 1 };
      break;
  }

  // sorting pipeline
  pipeline.push({ $sort: sortStage });

  // get files by user
  const files = await fileRepository.getMany(pipeline);

  //   if not found
  // if (!files?.length) throw MESSAGE_CONSTANTS.FILE_NOT_FOUND;

  return files;
};

const uploadFile = async (payload) => {
  console.log(payload, "-------");
  // validation
  const { error, value } = fileValidator.uploadFile.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { userId, buffer, originalname, mimetype, size, tags } = payload;

  try {
    // upload to cloudinary
    console.log("FILE UPLOAD: In-Progress ...");
    const result = await streamUpload(buffer, "uploads");

    console.log("FILE UPLOAD: Done ...");

    // save data to db
    return await fileRepository.add({
      file_name: originalname,
      file_type: mimetype,
      size,
      tags: tags?.split(","),
      user: userId,
      metadata: result,
    });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);

    throw err;
  }
};

const getFile = async (payload) => {
  // validation
  const { error, value } = fileValidator.getFile.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { userId, fileId } = payload;

  // get file by user & file
  const file = await fileRepository.getOne({ _id: fileId, user: userId });

  //   if not found
  if (!file) throw MESSAGE_CONSTANTS.FILE_NOT_FOUND;

  return file;
};

const deleteFiles = async (payload) => {
  // validation
  const { error, value } = fileValidator.getFile.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { userId } = payload;

  // get file by user & file
  await fileRepository.deleteMany({ user: userId });

  return true;
};

module.exports = {
  getFiles,
  uploadFile,
  getFile,
  deleteFiles,
};
