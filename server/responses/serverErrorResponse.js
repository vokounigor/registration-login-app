/**
 * @param {import('express').Response} res
 * @param {string} code
 * @param {string} message
 * @return {import('express').Response}
 */
function serverErrorResponse(res, code, message) {
  return res.status(500).send({
    code,
    message,
  });
}

module.exports = serverErrorResponse;
