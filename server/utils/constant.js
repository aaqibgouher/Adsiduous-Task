const MODEL_CONSTANTS = {
  USER: {
    MODEL: "UserModel",
    TABLE: "users",
  },
  FILE: {
    MODEL: "FileModel",
    TABLE: "files",
  },
};

const MESSAGE_CONSTANTS = {
  SUCCESSFULLY_REGISTERED: "Successfully registered user",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  BCRYPT_INVALID_SALT_ROUNDS: "Invalid bcrypt salt rounds",
  SUCCESSFULLY_LOGIN: "Successfully login",
  INVALID_EMAIL: "Invalid email",
  INVALID_EMAIL_AND_PASSWORD: "Invalid email/password",
  SUCCESSFULLY_GET_USER_INFO: "Successfully get user info",
  TOKEN_IS_REQUIRED: "Token is required",
  INVALID_USER_TOKEN_LOGIN_AGAIN: "Invalid user token, please login again",
  SUCCESSFULLY_LOGOUT: "Successfully logout",
  FILE_UNSUPPORTED_FILE_TYPE: "Unsupported file type",
  SUCESSFULLY_GET_FILES: "Successfully get files",
  SUCESSFULLY_UPLOAD_FILE: "Successfully uploaded file",
  FILE_NOT_FOUND: "File not found",
};

module.exports = {
  MODEL_CONSTANTS,
  MESSAGE_CONSTANTS,
};
