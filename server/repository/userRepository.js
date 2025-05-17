const { UserModel } = require("../models");

const getOne = async (query, exclude = "") => {
  return await UserModel.findOne(query).select(exclude);
};

const add = async (payload) => {
  return await UserModel.create(payload);
};

const update = async (condition, data) => {
  return await UserModel.updateOne(condition, data);
};

const deleteOne = async (condition) => {
  return await UserModel.deleteOne(condition);
};

module.exports = {
  getOne,
  add,
  update,
  deleteOne,
};
