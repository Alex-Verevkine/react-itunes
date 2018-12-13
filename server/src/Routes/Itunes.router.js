const express = require("express");
const AuthController = require("../Controllers/Auth.controller");
const ItunesController = require("../Controllers/Itunes.controller");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = (() => {
  const router = express.Router();
  const authController = new AuthController();
  const itunesController = new ItunesController();

  router
    .route("/getItune/:term")
    .get([
      authController.checkAuthMiddleware.bind(authController),
      itunesController.get,
      ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
    ]);

  return router;
})();
