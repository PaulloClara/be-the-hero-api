const { randomBytes } = require("crypto");
const database = require("../database");

module.exports = {
  async index(request, response) {
    try {
      const ongs = await database("ongs").select("*");

      return response.status(200).json(ongs);
    } catch (error) {
      return response.error.internalError(error);
    }
  },

  async store(request, response) {
    try {
      const { name, email, whatsapp, city, uf } = request.body;

      const id = randomBytes(4).toString("HEX");

      await database("ongs").insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });

      return response.status(200).json({ id });
    } catch (error) {
      return response.error.internalError(error);
    }
  }
};
