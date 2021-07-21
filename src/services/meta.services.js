const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const createError = require(`http-errors`);

module.exports = {
  uniqueEmail_serv_ue00: async (email) => {
    return new Promise(async(resolve, reject) => {
      try {
          const email_exist = await UserSchema.findOne({ email });
          if (email_exist) {
            return resolve("same");
          }
          return resolve("unique");
      } catch (error) {
        return reject(createError(500,{message:"Internal Server Error"}));
      }
    });
  },
  uniqueUsername_serv_uu00: async (uname) => {
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
