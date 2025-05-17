const { MESSAGE_CONSTANTS } = require("../utils/constant");
const commonUtils = require("../utils/common");
const authService = require("../service/authService");
const Output = require("../utils/output");

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    // if token not true
    if (!token) throw MESSAGE_CONSTANTS.TOKEN_IS_REQUIRED;

    // verify token
    const decoded = await commonUtils.verifyJWT(token);

    // get user info, check if is_verified & status
    const user = await authService.getUser(
      { _id: decoded.userId, token },
      "-password"
    );

    if (!user) throw MESSAGE_CONSTANTS.INVALID_USER_TOKEN_LOGIN_AGAIN;

    // add to req
    req.user = user;

    next();
  } catch (error) {
    return await Output.error(res, error);
  }
};

module.exports = {
  isAuthenticated,
};
