const { FileModel } = require("../models");

const update = async (condition, data) => {
  return await FileModel.updateOne(condition, data);
};

const add = async (payload) => {
  return await FileModel.create(payload);
};

const getOne = async (query, exclude = "") => {
  return await FileModel.findOne(query).select(exclude);
};

const getMany = async (pipeline) => {
  return await FileModel.aggregate(pipeline);
};

const deleteMany = async (condition) => {
  return await FileModel.deleteMany(condition); // or userId field
};

module.exports = {
  update,
  add,
  getOne,
  getMany,
  deleteMany,
};
