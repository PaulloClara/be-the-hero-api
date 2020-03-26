const { randomBytes } = require("crypto");
const database = require("../database");

module.exports = {
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
  }
};
