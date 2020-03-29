const { randomBytes } = require("crypto");

const jwt = require("../utils/jwt");
const bcrypt = require("../utils/bcrypt");

const database = require("../database");

module.exports = {
  async index(request, response) {
    try {
      const { page = 1 } = request.query;

      const ongs = await database("ongs")
        .limit(12)
        .offset((page - 1) * 12)
        .select([
          "id",
          "name",
          "email",
          "whatsapp",
          "city",
          "uf",
          "created_at"
        ]);

      const [count] = await database("ongs").count();
      response.header("X-Total-Count", count["count(*)"]);

      return response.status(200).json(ongs);
    } catch (error) {
      return response.error.internalError(error);
    }
  },

  async show(request, response) {
    try {
      const { id } = request.params;

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

  async store(request, response) {
    try {
      const { name, email, password, whatsapp, city, uf } = request.body;

      const id = randomBytes(4).toString("HEX");

      const ong = await database("ongs")
        .where("email", email)
        .first();
      if (ong) return response.error.badRequest("Email is already being used");

      if (!password)
        return response.error.badRequest("Password field is required");
      passwordHash = await bcrypt.hash(password);

      await database("ongs").insert({
        id,
        name,
        email,
        password: passwordHash,
        whatsapp,
        city,
        uf
      });

      const token = await jwt.sign(id);

      return response.status(200).json({ id, token });
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT" && error.errno === 19)
        return response.error.badRequest(
          "The ong could not be saved, check that all fields are valid!"
        );

      return response.error.internalError(error);
    }
  }
};
