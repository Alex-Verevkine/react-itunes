const express = require("express");
const AuthController = require("../Controllers/Auth.controller");
const UserController = require("../Controllers/User.controller");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = (() => {
  const router = express.Router();
  const authController = new AuthController();
  const userController = new UserController();

  router
    .route("/")
    .post([
      userController.post,
      ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
    ]);

  router
    .route("/login")
    .post([
      userController.login,
      ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
    ]);

  router
    .route("/logout")
    .get([
      userController.logout,
      ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
    ]);

  router
    .route("/")
    .get([
      authController.checkAuthMiddleware.bind(authController),
      userController.get,
      ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
    ]);

  router
    .route("/updateQueries/:userId")
    .put([
      authController.checkAuthMiddleware.bind(authController),
      userController.updateSearchQueries,
      ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
    ]);

  router
    .route("/terms/:userId")
    .get([
      authController.checkAuthMiddleware.bind(authController),
      userController.getTopTerms,
      ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
    ]);

  return router;
})();
