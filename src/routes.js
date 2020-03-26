const routes = require("express").Router();

const OngController = require("./controllers/ong");
const ProfileController = require("./controllers/profile");
const IncidentController = require("./controllers/incident");

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.store);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.store);
routes.delete("/incidents/:id", IncidentController.delete);

routes.get("/profile", ProfileController.index);

module.exports = routes;
