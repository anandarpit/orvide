const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const createError = require(`http-errors`);

module.exports = {
  uniqueEmailService: async (email) => {
    return new Promise((resolve, reject) => {
      try {
        connect.then(async (db) => {
          const email_exist = await UserSchema.findOne({ email });
          if (email_exist) {
            return resolve("same");
          }
          return resolve("unique");
        });
      } catch (error) {
        return reject(res.status(400).send(error));
      }
    });
  },
  uniqueUsernameService: async (uname) => {
    return new Promise((resolve, reject) => {
      try {
        connect.then(async (db) => {
          const user = await UserSchema.findOne({ username: uname });
          if (!user) {
            return resolve("unique");
          } else return resolve("same");
        });
      } catch (error) {
        return reject(
          createError(500, { code: "UU1", message: "Some error occurred" })
        );
      }
    });
  },
};
