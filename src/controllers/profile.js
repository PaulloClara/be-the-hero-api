const database = require("../database");

module.exports = {
  async index(request, response) {
    try {
      const ong_id = request.headers.authorization;

      const incidents = await database("incidents")
        .where("ong_id", ong_id)
        .select("*");

      return response.status(200).json(incidents);
    } catch (error) {
      return response.error.internalError(error);
    }
  }
};
