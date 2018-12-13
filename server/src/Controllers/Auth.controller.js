const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = class AuthController {
  /**
   * Check authentication middleware
   * @param  {any} req
   * @param  {any} res
   * @param  {any} next
   * @memberof AuthController
   *
   * Checks if the user is logged in
   */
  checkAuthMiddleware(req, res, next) {
    if (!this._checkIfAuth(req.session)) {
      ResponseMiddlewares.sendResponse(res, 401, "Not Authenticated!", null);
    } else {
      next();
    }
  }

  /**
   * Check If authenticated
   * @param  {any} req
   * @memberof AuthController
   */
  _checkIfAuth(session) {
    if (session.userId && session.cookie) {
      const date = new Date(Date.now());
      if (session.cookie.expires > date) {
        return true;
      }
      session.destroy();
      return false;
    }
    return false;
  }
};
