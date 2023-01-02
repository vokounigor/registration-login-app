/**
 * @param {import('express').Response} res
 * @param {string} code
 * @param {string} message
 * @return {import('express').Response}
 */
function badRequestResponse(res, code, message) {
  return res.status(400).send({
    code,
    message,
  });
}

module.exports = badRequestResponse;
