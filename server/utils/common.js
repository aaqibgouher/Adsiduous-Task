const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { MESSAGE_CONSTANTS } = require("./constant");

const encryptPass = async (password) => {
  const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

  if (!saltRounds) throw MESSAGE_CONSTANTS.BCRYPT_INVALID_SALT_ROUNDS;

  return await bcrypt.hash(password, +saltRounds);
};

const verifyPass = async (dbPassword, password) => {
  return await bcrypt.compare(password, dbPassword);
};

const generateJWT = async (payload) => {
  return JWT.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyJWT = async (token) => {
  return await JWT.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  encryptPass,
  verifyPass,
  generateJWT,
  verifyJWT,
};
