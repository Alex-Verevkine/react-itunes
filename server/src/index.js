//Get dependencies
const express = require("express");
require("dotenv").config({ path: __dirname + "/../.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const routes = require("./Routes/index");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

module.exports = (async () => {
  const app = express();

  /**
   * Establishing DB connection
   */
  mongoose.Promise = Promise;
  try {
    var uri = process.env.SERVER_DB_CS;
    await mongoose.connect(
      uri,
      { useNewUrlParser: true }
    );
    console.info("Successfully connected to database");
  } catch (err) {
    console.error({ err }, "DB connection failed.");
  }

  /**
   * Body parsers setup
   */
  app.use(bodyParser.json({}));
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  /**
   * Compression support
   */
  app.use(compression());

  /**
   * Web vulnerabilities protection
   */
  app.use(
    helmet.referrerPolicy({
      policy: "same-origin"
    })
  );
  app.use(helmet.xssFilter());
  app.use(helmet());

  /**
   * Restricting only methods currently supported
   */
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    next();
  });

  //Point static path to dist
  app.use(express.static(path.join(__dirname, "../build")));

  const sessionConfig = {
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { path: "/", httpOnly: true, maxAge: 36000000 },
    rolling: true,
    name: "user",
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  };

  app.use(session(sessionConfig));

  //Init routes
  routes(app);

  //Get port from environment and store in Express.
  const port = process.env.SERVER_PORT;

  app.set("port", port);

  app.listen(port, () => {
    console.info("Running on port: ", port);
  });

  return app;
})();
