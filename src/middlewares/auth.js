const jwt = require("../utils/jwt");

module.exports = async (request, response, next) => {
  const auth = request.header("Authorization");
  if (!auth) return response.error.unauthorized("Malformed token");

  const [prefix, token] = auth.split(" ");
  if (!token) return response.error.unauthorized("Token not found");

  const { id } = (await jwt.verify(token)) || {};
  if (!id) return response.error.unauthorized("Invalid token, sign in again!");

  request.auth = { id };

  return next();
};
