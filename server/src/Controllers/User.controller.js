const mongoose = require("mongoose");
const UserModel = require("../Models/User.model.js");
const ResponseMiddlewares = require("../Middlewares/Response.middlwares");
module.exports = class UserController {
  async get(req, res, next) {
    try {
      const requestedUser = await UserModel.findById(req.session.userId).lean();
      ResponseMiddlewares.sendResponseData(res, requestedUser, next);
    } catch (error) {
      next(error);
    }
  }

  async post(req, res, next) {
    try {
      const requestedUser = await UserModel.create(req.body);
      req.session.userId = requestedUser._id.toString();
      req.session.cookie.expires = new Date(Date.now() + 36000000);
      req.session.cookie.maxAge = 36000000;
      await req.session.save();
      ResponseMiddlewares.sendResponseData(res, requestedUser, next);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const requestedUser = await UserModel.findOne({
        userName: req.body.userName,
        password: req.body.password
      });
      req.session.userId = requestedUser._id.toString();
      req.session.cookie.expires = new Date(Date.now() + 36000000);
      req.session.cookie.maxAge = 36000000;
      await req.session.save();
      ResponseMiddlewares.sendResponseData(res, requestedUser, next);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    await req.session.destroy();
    ResponseMiddlewares.sendResponseData(res, null, next);
  }

  async updateSearchQueries(req, res, next) {
    try {
      const updateResponse = await UserModel.update(
        { _id: req.params.userId },
        { $push: { searchQueries: req.body.searchQuery } }
      );
      ResponseMiddlewares.sendResponseData(res, updateResponse, next);
    } catch (error) {
      next(error);
    }
  }

  async getTopTerms(req, res, next) {
    try {
      const requestedTerms = (await UserModel.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(req.params.userId) } },
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
      ])).map(responseObj => responseObj._id);
      ResponseMiddlewares.sendResponseData(res, requestedTerms, next);
    } catch (error) {
      next(error);
    }
  }
};
