const routes = require("express").Router();

const OngController = require("./controllers/ong");
const SessionController = require("./controllers/session");
const IncidentController = require("./controllers/incident");

const AuthorizationMiddleware = require("./middlewares/auth");
const HandleMiddleware = require("./middlewares/handle");

routes.use(HandleMiddleware.setHandleError);

routes.get("/ongs", OngController.index);
routes.post("/ongs", HandleMiddleware.ongRegister, OngController.store);

routes.get("/sessions", AuthorizationMiddleware, SessionController.index);
routes.get(
  "/sessions/incidents",
  AuthorizationMiddleware,
  SessionController.show
);
routes.post(
  "/sessions",
  HandleMiddleware.createSession,
  SessionController.store
);

routes.get("/incidents", IncidentController.index);
routes.post(
  "/incidents",
  AuthorizationMiddleware,
  HandleMiddleware.incidentRegister,
  IncidentController.store
);
routes.delete(
  "/incidents/:id",
  AuthorizationMiddleware,
  IncidentController.delete
);

module.exports = routes;
