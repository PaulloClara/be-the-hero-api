const jwt = require("jsonwebtoken");

module.exports = {
  sign(id) {
    return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: Number(process.env.JWT_VALIDITY)
    });
  },

  verify(token) {
    return jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY,
      (error, result) => result || null
    );
  }
};
