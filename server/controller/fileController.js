const { MESSAGE_CONSTANTS } = require("../utils/constant");
const Output = require("../utils/output");
const fileService = require("../service/fileService");

const getFiles = async (req, res) => {
  try {
    const data = await fileService.getFiles({
      userId: req.user._id.toString(),
      search: req.query?.search,
      sortBy: req.query.sortBy,
    });

    return Output.success(res, MESSAGE_CONSTANTS.SUCESSFULLY_GET_FILES, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const uploadFile = async (req, res) => {
  try {
    const data = await fileService.uploadFile({
      ...req.file,
      tags: req.body.tags,
      userId: req.user._id.toString(),
    });

    return Output.success(res, MESSAGE_CONSTANTS.SUCESSFULLY_UPLOAD_FILE, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const getFile = async (req, res) => {
  try {
    const data = await fileService.getFile({
      userId: req.user._id.toString(),
      fileId: req.params.fileId.toString(),
    });

    return Output.success(res, MESSAGE_CONSTANTS.SUCESSFULLY_GET_FILES, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  getFiles,
  uploadFile,
  getFile,
};
