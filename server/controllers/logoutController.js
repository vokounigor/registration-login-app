const serverErrorResponse = require("../responses/serverErrorResponse");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {import('express').Response}
 */
module.exports = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return serverErrorResponse(res, "500.0.1", "Internal server error");
    }
    return res.status(200).send({
      message: "Sucessful logout",
    });
  });
};
