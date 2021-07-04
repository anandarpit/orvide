const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const UserMetaSchema = require("../model/User/UserMeta");
const createError = require(`http-errors`);

module.exports = {
  UserProfile: async (_id) => {
    return new Promise((resolve, reject) => {
      try {
        connect.then(async (db) => {
          const user = await UserSchema.findOne({ _id });
          if (!user) {
            return reject(createError.InternalServerError({ code: "ISE", "value": "some error occured" }))
          }
          else {
            return resolve(user)
          }
        });
      } catch (error) { return reject(error) }
    });
  },
};