const badRequestResponse = require("../responses/badRequestResponse");
const badRequestMapper = require("../errors/badRequestMapper");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isLoggedOut = (req, res, next) => {
  if (!req.session.userId) {
    next();
  } else {
    return badRequestResponse(
      res,
      badRequestMapper.userAlreadyLoggedIn,
      "User is already logged in"
    );
  }
};

module.exports = isLoggedOut;
