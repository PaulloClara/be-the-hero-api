const database = require("../database");

module.exports = {
  async index(request, response) {
    const incidents = await database("incidents").select("*");

    return response.status(200).json(incidents);
  },

  async store(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await database("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    return response.status(200).json({ id });
  },

  async delete(request, response) {
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
  }
};
