const connect = require("../config/connection");
const UserSchema = require("../model/users");
const createError = require(`http-errors`);

module.exports = {
  myProfile: async (_id) => {
    const user = await UserSchema.findOne({ _id });

    if (!user) {
      throw createError.InternalServerError()
    } else {
      return user
    }
  },
};
