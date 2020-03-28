const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

const database = require("../database");

module.exports = {
  async store(request, response) {
    try {
      const { id = "", email = "", password = "" } = request.body;

      const ong = await database("ongs")
        .where("id", id)
        .orWhere("email", email)
        .select("*")
        .first();

      if (!ong) return response.error.notFound("Ong not found");

      if (!(await bcrypt.compare(password, ong.password)))
        return response.error.unauthorized("Incorret password");
      ong.password = undefined;

      const token = jwt.sign(ong.id);

      return response.status(200).json({ ong, token });
    } catch (error) {
      return response.error.internalError(error);
    }
  }
};
