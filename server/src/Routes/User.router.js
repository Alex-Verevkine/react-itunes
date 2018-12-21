const express = require("express");
const { AuthAPI, UserAPI } = require("../API");
const AuthController = require("../Controllers/Auth.controller");
const UserController = require("../Controllers/User.controller");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = (() => {
  const router = express.Router();
  const authAPI = new AuthAPI();
  const userAPI = new UserAPI();

  router.route("/").post([userAPI.create.bind(userAPI)]);

  router.route("/login").post([userAPI.login.bind(userAPI)]);

  router.route("/logout").get([userAPI.logout.bind(userAPI)]);

  router.route("/").get([userAPI.get.bind(userAPI)]);

  router
    .route("/updateQueries/:userId")
    .put([
      authAPI.checkAuthMiddleware.bind(authAPI),
      userAPI.updateSearchQueries.bind(userAPI)
    ]);

  router
    .route("/terms/:userId")
    .get([
      authAPI.checkAuthMiddleware.bind(authAPI),
      userAPI.getTopTerms.bind(userAPI)
    ]);
  router.use(
    "*",
    ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
  );
  return router;
})();
