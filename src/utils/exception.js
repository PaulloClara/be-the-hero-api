module.exports = {
  newError(message, code) {
    this.response.status(code).json({ error: message });
  },

  badRequest(message) {
    this.newError(message, 400);
  },

  unauthorized(message) {
    this.newError(message, 401);
  },

  forbidden(message) {
    this.newError(message, 403);
  },

  notFound(message) {
    this.newError(message, 404);
  },

  internalError(error) {
    console.error(error);

    this.newError("Unexpected error", 500);
  }
};
