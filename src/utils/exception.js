module.exports = {
  newError(message, code) {
    this.response.status(code).json({ error: message });
  },

  badRequest(message) {
    this.newError(message, 400);
  },

  notFound(message) {
    this.newError(message, 404);
  },

  internalError(error) {
    console.error(error);

    this.newError("Unexpected error", 500);
  }
};
