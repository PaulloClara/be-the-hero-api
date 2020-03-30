const database = require("../database");

module.exports = {
  async index(request, response) {
    try {
      const { page = 1 } = request.query;

      const incidents = (
        await database("incidents")
          .join("ongs", "ongs.id", "=", "incidents.ong_id")
          .limit(12)
          .offset((page - 1) * 12)
          .select([
            "incidents.*",
            "ongs.name",
            "ongs.email",
            "ongs.whatsapp",
            "ongs.city",
            "ongs.uf"
          ])
      ).map(incident => ({
        id: incident.id,
        title: incident.title,
        value: incident.value,
        description: incident.description,
        created_at: incident.created_at,
        ong: {
          id: incident.ong_id,
          name: incident.name,
          email: incident.email,
          whatsapp: incident.whatsapp,
          city: incident.city,
          uf: incident.uf
        }
      }));

      const [count] = await database("incidents").count();
      response.header("X-Total-Count", count["count(*)"]);

      return response.status(200).json(incidents);
    } catch (error) {
      return response.error.internalError(error);
    }
  },

  async store(request, response) {
    try {
      const { id: ong_id } = request.auth;
      const { title, description, value } = request.body;

      const [id] = await database("incidents").insert({
        title,
        description,
        value,
        ong_id
      });

      return response.status(200).json({ id });
    } catch (error) {
      return response.error.internalError(error);
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const { id: ong_id } = request.auth;

      const incident = await database("incidents")
        .where("id", id)
        .select("ong_id")
        .first();
      if (!incident) return response.error.notFound("Incident not found");

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
