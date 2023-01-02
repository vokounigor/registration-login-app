const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const registrationValidator = require("../validators/registrationValidator");
const emailValidator = require("email-validator");
const badRequestResponse = require("../responses/badRequestResponse");
const serverErrorResponse = require("../responses/serverErrorResponse");
const badRequestMapper = require("../errors/badRequestMapper");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @return {import('express').Response}
 */
module.exports = async (req, res) => {
  const { body } = req;

  if (!registrationValidator.bodyHasRequiredParams(body)) {
    return badRequestResponse(
      res,
      badRequestMapper.missingParams,
      "Bad request. Required body parameters: firstName, lastName, email, password"
    );
  }

  if (!registrationValidator.hasCorrectBodyParamTypes(body)) {
    return badRequestResponse(
      res,
      badRequestMapper.incorrectParamType,
      "Bad request. Incorrect body paramater types. All types must be string."
    );
  }

  const { firstName, lastName, email, password } = body;

  if (!emailValidator.validate(email)) {
    return badRequestResponse(
      res,
      badRequestMapper.invalidEmail,
      "Bad request. Email is not valid."
    );
  }

  if (!registrationValidator.longEnoughPassword(password)) {
    return badRequestResponse(
      res,
      badRequestMapper.passwordTooShort,
      "Bad request. Minimum password length is 6 characters."
    );
  }

  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return badRequestResponse(
        res,
        badRequestMapper.userAlreadyExists,
        "Bad request. User with that email already exists."
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.PASSWORD_SALT)
    );

    user = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Set in session userId
    req.session.userId = user.id;

    return res.status(201).send({
      message: "User successfully created.",
    });
  } catch (err) {
    console.error(err);
    return serverErrorResponse(res, "500.0.1", "Internal server error");
  }
};
