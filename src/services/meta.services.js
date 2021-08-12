const connect = require("../config/connection");
const UserSchema = require("../model/users");
const createError = require(`http-errors`);
const orgSchema = require(`../model/Org`);

module.exports = {
  uniqueEmail: async (email) => {
    const email_exist = await UserSchema.findOne({
      "emails.email": [email],
    },{"_id" : 1});
    if (email_exist) {
      return "same"
    } else {
      return "unique"
    }
  },
  uniqueUsername: async (uname) => {
        const user = await UserSchema.findOne({ "data.un": uname },{"_id" : 1});
        if (!user) {
          return "unique";
        } else return "same";
  },
  unique_orgName: async (validatedResult) => {
    return new Promise(async (resolve, reject) => {
      const orgName = await orgSchema.findOne({
        orgName: validatedResult.orgName,
      });
      var nameStatus = "unique";
      if (orgName) nameStatus = "same";
      return resolve(nameStatus);
    });
  },
  unique_orgId: async (validatedResult) => {
    return new Promise(async (resolve, reject) => {
      const orgName = await orgSchema.findOne({
        orgId: validatedResult.orgId,
      });
      var IdStatus = "unique";
      if (orgName) IdStatus = "same";
      return resolve(IdStatus);
    });
  },
};
