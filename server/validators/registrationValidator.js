/**
 * @param {Object} body
 * @return {boolean}
 */
const bodyHasRequiredParams = (body) => {
  return (
    Object.prototype.hasOwnProperty.call(body, "firstName") &&
    Object.prototype.hasOwnProperty.call(body, "lastName") &&
    Object.prototype.hasOwnProperty.call(body, "email") &&
    Object.prototype.hasOwnProperty.call(body, "password")
  );
};

/**
 * @param {Object} body
 * @return {boolean}
 */
const hasCorrectBodyParamTypes = (body) => {
  return (
    typeof body.firstName === "string" &&
    typeof body.lastName === "string" &&
    typeof body.email === "string" &&
    typeof body.password === "string"
  );
};

/**
 * @param {string} password
 * @return {boolean}
 */
const longEnoughPassword = (password) => {
  return password.length >= 6;
};

module.exports = {
  bodyHasRequiredParams,
  hasCorrectBodyParamTypes,
  longEnoughPassword,
};
