const express = require("express");
const { AuthAPI, MediaAPI } = require("../API");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = (() => {
  const router = express.Router();
  const authAPI = new AuthAPI();
  const mediaAPI = new MediaAPI();

  router
    .route("/getItune/:term")
    .get([
      authAPI.checkAuthMiddleware.bind(authAPI),
      mediaAPI.get.bind(mediaAPI)
    ]);

  router.use(
    "*",
    ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
  );

  return router;
})();
