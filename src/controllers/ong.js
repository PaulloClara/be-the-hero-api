const { randomBytes } = require("crypto");
const database = require("../database");

module.exports = {
  async index(request, response) {
    const ongs = await database("ongs").select("*");

    return response.status(200).json(ongs);
  },

  async store(request, response) {
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
  }
};
