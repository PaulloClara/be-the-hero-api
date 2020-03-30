const errors = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error"
};

module.exports = {
  newError(message, statusCode) {
    this.response.status(statusCode).json({
      statusCode,
      error: errors[statusCode],
      message,
      validation: {
        source: "running",
        keys: []
      }
    });
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
