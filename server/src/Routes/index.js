const express = require("express");
const path = require("path");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
const userRouter = require("./User.router");
const itunesRouter = require("./Itunes.router");
module.exports = app => {
  const router = express.Router();
  // router.all(
  //   "/api/",
  //   ResponseMiddlewares.responseHandlerMiddlware.bind(ResponseMiddlewares)
  // );
  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  });

  app.use("/api/user", userRouter);
  app.use("/api/itunes", itunesRouter);

  app.use("/api/itunes", itunesRouter);
  app.use("/", router);

  app.use(ResponseMiddlewares.errorHandlerMiddleware.bind(ResponseMiddlewares));
};
