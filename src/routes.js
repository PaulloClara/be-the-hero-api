const routes = require("express").Router();

const OngController = require("./controllers/ong");
const IncidentController = require("./controllers/incident");

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.store);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.store);

module.exports = routes;
