const badRequestMapper = {
  missingParams: "400.0.1",
  incorrectParamType: "400.0.2",
  invalidEmail: "400.0.3",
  userAlreadyExists: "400.0.4",
  passwordTooShort: "400.0.5",
  userAlreadyLoggedIn: "400.0.6",
};

module.exports = badRequestMapper;
