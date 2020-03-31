const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

const database = require("../database");

module.exports = {
  async index(request, response) {
    try {
      const { id } = request.auth;

      const ong = await database("ongs")
        .where("id", id)
        .first()
        .select([
          "id",
          "name",
          "email",
          "whatsapp",
          "city",
          "uf",
          "created_at"
        ]);
      if (!ong) return response.error.notFound("Ong not found");

      return response.status(200).json(ong);
    } catch (error) {
      return response.error.internalError(error);
    }
  },

  async show(request, response) {
    try {
      const { id: ong_id } = request.auth;

      const incidents = await database("incidents")
        .where("ong_id", ong_id)
        .orderBy("created_at", "desc")
        .select("*");

      return response.status(200).json(incidents);
    } catch (error) {
      return response.error.internalError(error);
    }
  },

  async store(request, response) {
    try {
      const { email, password } = request.body;

      const ong = await database("ongs")
        .where("email", email)
        .first()
        .select("*");
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
