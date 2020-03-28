const Exception = require("../utils/exception");

module.exports = (request, response, next) => {
  Object.defineProperty(Exception, "response", {
    value: response,
    writable: true,
    enumerable: false
  });
  response.error = Exception;

  return next();
};
