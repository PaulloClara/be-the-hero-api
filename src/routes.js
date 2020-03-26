const routes = require("express").Router();

const OngController = require("./controllers/ong");

routes.post("/ongs", OngController.store);

module.exports = routes;
