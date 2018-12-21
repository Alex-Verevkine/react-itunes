const { AuthController, UserController } = require("../Controllers");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = class AuthAPI {
  constructor() {
    this.authController = new AuthController();
    this.userController = new UserController();
  }
  /**
   * Check authentication middleware
   * @param  {any} req
   * @param  {any} res
   * @param  {any} next
   * @memberof AuthController
   *
   * Checks if the user is logged in
   */
  async checkAuthMiddleware(req, res, next) {
    if (!(await this._checkIfAuth(req.session))) {
      next(new AppError(401, "Not Authenticated!"));
    } else {
      next();
    }
  }

  /**
   * Check If authenticated
   * @param  {any} req
   * @memberof AuthController
   */
  async _checkIfAuth(session) {
    if (session.userId && session.cookie) {
      if (
        session.cookie.expires > new Date(Date.now()) &&
        (await this.userController.isUserExists({
          _id: session.userId
        }))
      ) {
        return true;
      }
      session.destroy();
      return false;
    }
    return false;
  }
};
