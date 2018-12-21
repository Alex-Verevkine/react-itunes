const UserModel = require("../Models/User.model.js");
module.exports = class UserController {
  /**
   * @desc Request from DB User Document by provided User ID.
   */
  get(userId) {
    return UserModel.findById(userId).lean();
  }

  /**
   * @desc Create, Store and Returns new User Document in DB Collection with provided UserName and Password.
   * Also stores Current User on Session.
   */
  create(userData) {
    return UserModel.create(userData);
  }

  /**
   * @desc Retrieves requested User Document by provided UserName and Password.
   * Also stores Current User on Session.
   */
  login(userData) {
    return UserModel.findOne(userData);
  }

  /**
   * @desc Update Current User with provided UserId.
   */
  updateUserById(userId, updateBody, updateOptions) {
    return UserModel.findByIdAndUpdate(userId, updateBody, updateOptions);
  }

  isUserExists(query) {
    return UserModel.count(query);
  }

  /**
   * @desc User aggregation method.
   */
  aggregation(aggregationQueries) {
    return UserModel.aggregate(aggregationQueries);
  }
};
