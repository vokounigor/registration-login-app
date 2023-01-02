/**
 * @param {Object} body
 * @return {boolean}
 */
const bodyHasRequiredParams = (body) => {
	return (
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
	  typeof body.email === "string" &&
	  typeof body.password === "string"
	);
  };
  
  module.exports = {
	bodyHasRequiredParams,
	hasCorrectBodyParamTypes,
  };
  