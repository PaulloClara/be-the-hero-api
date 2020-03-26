const database = require("../database");

module.exports = {
  async store(request, response) {
    const { id } = request.body;

    const ong = await database("ongs")
      .where("id", id)
      .select("name")
      .first();

    if (!ong) return response.status(404).json({ error: "Ong not found" });

    return response.status(200).json(ong);
  }
};
