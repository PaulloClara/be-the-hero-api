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

  async store(request, response) {
    try {
      const { name, email, password, whatsapp, city, uf } = request.body;

      const id = randomBytes(4).toString("HEX");
      const ong = await database("ongs")
        .where("email", email)
        .first();
      if (ong) return response.error.badRequest("Email is already being used");

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

      const newOng = await database("ongs")
        .where("id", id)
        .first()
        .select(["name", "email", "whatsapp", "city", "uf", "created_at"]);

      const token = await jwt.sign(id);

      return response.status(200).json({ ong: { id, ...newOng }, token });
    } catch (error) {
      return response.error.internalError(error);
    }
  }
};
