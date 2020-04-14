const routes = require("express").Router();

const OngController = require("./controllers/ong");
const OtherController = require("./controllers/other");
const SessionController = require("./controllers/session");
const IncidentController = require("./controllers/incident");

const HandleMiddleware = require("./middlewares/handle");
const AuthorizationMiddleware = require("./middlewares/auth");

routes.use(HandleMiddleware.setHandleError);

routes.get("/ongs", HandleMiddleware.pagination, OngController.index);
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

routes.get("/incidents", HandleMiddleware.pagination, IncidentController.index);
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

routes.get("/*", OtherController.index);

module.exports = routes;
