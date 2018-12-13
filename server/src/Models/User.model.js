const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * User Schema
 */
const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  searchQueries: [
    {
      type: String
    }
  ]
});

/**
 * User Model
 */
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
