const { resolve: resolvePath } = require("path");

module.exports = {
  async index(request, response) {
    try {
      return response.sendFile(
        resolvePath(__dirname, "..", "views", "index.html")
      );
    } catch (error) {
      return response.error.internalError(error);
    }
  }
};
