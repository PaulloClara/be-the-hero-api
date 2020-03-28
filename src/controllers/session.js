const database = require("../database");

module.exports = {
  async store(request, response) {
    try {
      const { id } = request.body;

      const ong = await database("ongs")
        .where("id", id)
        .select("name")
        .first();

      if (!ong) return response.error.notFound("Ong not found");

      return response.status(200).json(ong);
    } catch (error) {
      return response.error.internalError(error);
    }
  }
};
