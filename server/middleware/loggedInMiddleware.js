const unauthorizedRequestMapper = require("../errors/unauthorizedRequestMapper");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    return res.status(401).send({
      code: unauthorizedRequestMapper.userNotLoggedIn,
      message: "User is not logged in",
    });
  }
};

module.exports = isLoggedIn;
