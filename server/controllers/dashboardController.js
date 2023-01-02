const UserModel = require("../models/User");
const serverErrorResponse = require("../responses/serverErrorResponse");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 */
module.exports = async (req, res) => {
  let user = await UserModel.findById(req.session.userId);

  // If a user got deleted in the meantime, but still has a cookie
  if (!user) {
    req.session.destroy((err) => {
      if (err) {
        return serverErrorResponse(res, "500.0.1", "Internal server error");
      }
    });
    return res.status(401).send({
      message: "No user found for current session",
    });
  }

  const { firstName, lastName, email } = user;

  res.status(200).send({
    userInfo: {
      firstName,
      lastName,
      email,
    },
  });
};
