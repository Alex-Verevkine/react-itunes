const { UserController, AuthController } = require("../Controllers");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
const AppError = require("../Bin/AppError");
const mongoose = require("mongoose");
module.exports = class UserAPI {
  constructor() {
    this.userController = new UserController();
    this.authController = new AuthController();
  }
  /**
   * @desc Get User by ID API.
   */
  async get(req, res, next) {
    try {
      const { userId } = req.session;
      const requestedUser = await this.userController.get(userId);
      ResponseMiddlewares.sendResponseData(res, { user: requestedUser }, next);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc Create User API.
   */
  async create(req, res, next) {
    try {
      const { userName, password } = req.body;
      const requestedUser = await this.userController.create({
        userName,
        password
      });
      await this.authController.setSession(req, {
        userId: requestedUser._id.toString()
      });
      ResponseMiddlewares.sendResponseData(res, { user: requestedUser }, next);
    } catch (error) {
      if (error.code === 11000) {
        error = new AppError(409, "User with current name already exists!");
      }
      next(error);
    }
  }

  /**
   * @desc Log in with provided user credentials.
   */
  async login(req, res, next) {
    try {
      const { userName, password } = req.body;
      const requestedUser = await this.userController.login({
        userName
      });
      if (!requestedUser) {
        throw new AppError(404, "This user doesn't exist!");
      }
      if (!(await requestedUser.isPasswordMatch(password))) {
        throw new AppError(409, "Wrong password!");
      }
      await this.authController.setSession(req, {
        userId: requestedUser._id.toString()
      });
      ResponseMiddlewares.sendResponseData(res, { user: requestedUser }, next);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc Destroys current User Session.
   */
  async logout(req, res, next) {
    await req.session.destroy();
    ResponseMiddlewares.sendResponseData(res, null, next);
  }

  /**
   * @desc Push provided user search term to Current User with provided UserId.
   */
  async updateSearchQueries(req, res, next) {
    try {
      const { userId } = req.params;
      const { searchQuery } = req.body;
      const updateResponse = await this.userController.updateUserById(
        userId,
        {
          $push: { searchQueries: searchQuery }
        },
        { new: true }
      );
      ResponseMiddlewares.sendResponseData(res, updateResponse, next);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @desc Retrieves Top 10 mostly searched queries by Current user with provided User ID.
   */
  async getTopTerms(req, res, next) {
    try {
      const { userId } = req.params;
      const aggregationQuery = [
        { $match: { _id: mongoose.Types.ObjectId(userId) } },
        {
          $project: {
            _id: 0,
            terms: "$searchQueries"
          }
        },
        {
          $unwind: {
            path: "$terms"
          }
        },
        {
          $group: {
            _id: "$terms",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        {
          $limit: 10
        },
        {
          $project: { _id: 1 }
        }
      ];
      const requestedTerms = (await this.userController.aggregation(
        aggregationQuery
      )).map(responseObj => responseObj._id);
      ResponseMiddlewares.sendResponseData(res, requestedTerms, next);
    } catch (error) {
      next(error);
    }
  }
};
