const database = require("../database");

module.exports = {
  async index(request, response) {
    try {
      const { page = 1 } = request.query;

      const [count] = await database("incidents").count();

      const incidents = await database("incidents")
        .join("ongs", "ongs.id", "=", "incidents.ong_id")
        .limit(5)
        .offset((page - 1) * 5)
        .select([
          "incidents.*",
          "ongs.name",
          "ongs.email",
          "ongs.whatsapp",
          "ongs.city",
          "ongs.uf"
        ]);

      response.header("X-Total-Count", count["count(*)"]);

      return response.status(200).json(incidents);
    } catch (error) {
      return response.error.internalError(error);
    }
  },

  async store(request, response) {
    try {
      const { title, description, value } = request.body;
      const ong_id = request.headers.authorization;

      const [id] = await database("incidents").insert({
        title,
        description,
        value,
        ong_id
      });

      return response.status(200).json({ id });
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT" && error.errno === 19)
        return response.error.badRequest(
          "The incident could not be saved, check that all fields are valid!"
        );

      return response.error.internalError(error);
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const ong_id = request.headers.authorization;

      const incident = await database("incidents")
        .where("id", id)
        .select("ong_id")
        .first();

      if (incident.ong_id !== ong_id)
        return response.status(401).json({ error: "Operation not permitted" });

      await database("incidents")
        .where("id", id)
        .delete();

      return response.status(200).json({ message: "OK" });
    } catch (error) {
      return response.error.internalError(error);
    }
  }
};
