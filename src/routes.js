const routes = require("express").Router();

const OngController = require("./controllers/ong");

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.store);

module.exports = routes;
