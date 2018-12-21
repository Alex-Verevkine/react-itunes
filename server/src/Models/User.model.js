const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

userSchema.methods.isPasswordMatch = function(providedPassword) {
  return bcrypt.compare(providedPassword, this.password);
};

userSchema.pre("save", async function(next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * User Model
 */
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
