const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const loginValidator = require("../validators/loginValidator");
const badRequestResponse = require("../responses/badRequestResponse");
const serverErrorResponse = require("../responses/serverErrorResponse");
const badRequestMapper = require("../errors/badRequestMapper");
const unauthorizedRequestMapper = require("../errors/unauthorizedRequestMapper");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 */
module.exports = async (req, res) => {
  const { body } = req;

  if (!loginValidator.bodyHasRequiredParams(body)) {
    return badRequestResponse(
      res,
      badRequestMapper.missingParams,
      "Bad request. Required body params: email, password"
    );
  }

  if (!loginValidator.hasCorrectBodyParamTypes(body)) {
    return badRequestResponse(
      res,
      badRequestMapper.incorrectParamType,
      "Bad request. Incorrect body paramater types. All types must be string."
    );
  }

  const { email, password } = body;

  if (!emailValidator.validate(email)) {
    return badRequestResponse(
      res,
      badRequestMapper.invalidEmail,
      "Bad request. Email is not valid."
    );
  }

  let user;
  try {
    user = await UserModel.findOne({ email });
  } catch (err) {
    console.error(err);
    return serverErrorResponse(res, "500.0.1", "Internal server error");
  }

  if (!user) {
    return res.status(404).send({
      code: "404.0.1",
      message: "User not found",
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).send({
      code: unauthorizedRequestMapper.incorrectPassword,
      message: "Incorrect password provided",
    });
  }

  // Set in session userId
  req.session.userId = user.id;

  return res.status(200).send({
    message: "Successful login",
  });
};
