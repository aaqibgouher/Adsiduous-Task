const authValidator = require("../validations/authValidator");
const userRepository = require("../repository/userRepository");
const fileService = require("../service/fileService");
const { MESSAGE_CONSTANTS } = require("../utils/constant");
const commonUtils = require("../utils/common");

const register = async (payload) => {
  // validation
  const { error, value } = authValidator.register.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { name, email, password } = payload;

  //   check if user exists by email or phone
  const user = await userRepository.getOne({
    email: email,
  });

  //   if user exists, throw error
  if (user) throw MESSAGE_CONSTANTS.EMAIL_ALREADY_EXISTS;

  //   hash password
  const encryptPass = await commonUtils.encryptPass(password);

  //   add user
  await userRepository.add({
    name,
    email,
    password: encryptPass,
    is_active: true,
  });

  return { name, email, password: "*******", is_active: true };
};

const login = async (payload) => {
  // validation
  const { error, value } = authValidator.login.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { email, password } = payload;

  console.log(payload);

  //   check if user exists by email
  const user = await userRepository.getOne({
    email: email,
  });

  //   if user exists, throw error
  if (!user) throw MESSAGE_CONSTANTS.INVALID_EMAIL;

  //   check if password matched?
  if (!(await commonUtils.verifyPass(user.password, password)))
    throw MESSAGE_CONSTANTS.INVALID_EMAIL_AND_PASSWORD;

  //   generate token
  const token = await commonUtils.generateJWT({
    userId: user._id,
  });

  //   save token to db
  await userRepository.update({ _id: user._id }, { $set: { token } });

  //    remove password
  const userWithoutPass = user.toObject();

  //   remove password
  delete userWithoutPass.password;

  return { ...userWithoutPass, token };
};

const getUser = async (query, exclude = "") => {
  return await userRepository.getOne(query, exclude);
};

const logout = async (payload) => {
  // validation
  const { error, value } = authValidator.logout.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { userId } = payload;

  //   for now, empty token for logout user
  await userRepository.update({ _id: userId }, { $set: { token: "" } });

  return true;
};

const deleteUser = async (payload) => {
  // validation
  const { error, value } = authValidator.logout.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { userId } = payload;

  //   for now, empty token for logout user
  await userRepository.deleteOne({ _id: userId });

  return true;
};

const remove = async (payload) => {
  // validation
  const { error, value } = authValidator.remove.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  // destructure
  const { email } = payload;

  //   for now, empty token for logout user
  const user = await userRepository.getOne({ email });

  if (user) {
    await fileService.deleteFiles({ userId: user._id.toString() });
    await deleteUser({ userId: user._id.toString() });
  }

  return true;
};

module.exports = {
  register,
  login,
  getUser,
  logout,
  deleteUser,
  remove,
};
