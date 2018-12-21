const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = class AuthController {
  setSession(req, data = {}) {
    Object.assign(req.session, data);
    req.session.cookie.expires = new Date(Date.now() + 36000000);
    req.session.cookie.maxAge = 36000000;
    return req.session.save();
  }
};
