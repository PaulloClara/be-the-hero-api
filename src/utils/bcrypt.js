const bcrypt = require("bcrypt");

module.exports = {
  hash(password) {
    return bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
  },

  compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
};
