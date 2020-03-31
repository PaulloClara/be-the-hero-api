const { celebrate, Segments, Joi } = require("celebrate");
const Exception = require("../utils/exception");

module.exports = {
  setHandleError(request, response, next) {
    Object.defineProperty(Exception, "response", {
      value: response,
      writable: true,
      enumerable: false
    });

    response.error = Exception;

    return next();
  },

  ongRegister: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string()
        .max(40)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
      whatsapp: Joi.string()
        .min(10)
        .max(11)
        .required(),
      city: Joi.string()
        .max(40)
        .required(),
      uf: Joi.string()
        .length(2)
        .required()
    })
  }),

  incidentRegister: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string()
        .max(160)
        .required(),
      description: Joi.string()
        .max(600)
        .required(),
      value: Joi.number()
        .integer()
        .positive()
        .required()
    })
  }),

  createSession: celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required()
    })
  }),

  pagination: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
        .integer()
        .positive()
    })
  })
};
