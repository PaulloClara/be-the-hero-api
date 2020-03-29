const routes = require("express").Router();

const OngController = require("./controllers/ong");
const SessionController = require("./controllers/session");
const IncidentController = require("./controllers/incident");

const AuthMiddlewares = require("./middlewares/auth");
const HandleRequestMiddlewares = require("./middlewares/handle-request");

routes.use(HandleRequestMiddlewares);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.store);

routes.get("/sessions", AuthMiddlewares, SessionController.index);
routes.get("/sessions/incidents", AuthMiddlewares, SessionController.show);
routes.post("/sessions", SessionController.store);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", AuthMiddlewares, IncidentController.store);
routes.delete("/incidents/:id", AuthMiddlewares, IncidentController.delete);

module.exports = routes;
