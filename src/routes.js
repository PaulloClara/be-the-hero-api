const routes = require("express").Router();

const OngController = require("./controllers/ong");
const SessionController = require("./controllers/session");
const ProfileController = require("./controllers/profile");
const IncidentController = require("./controllers/incident");

const HandleRequestMiddlewares = require("./middlewares/handle-request");

routes.use(HandleRequestMiddlewares);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.store);

routes.post("/sessions", SessionController.store);

routes.get("/profile", ProfileController.index);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.store);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
