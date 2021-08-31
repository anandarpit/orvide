const connect = require("../config/connection");
const userSchema = require("../model/users");
const createError = require(`http-errors`);
const orgSchema = require(`../model/Org`);
const logger = require(`../config/logger`)
const {orgIdName} = require('../functions/userOrg')

module.exports = {
  uniqueEmail: async (email) => {
    const email_exist = await userSchema.findOne({
      "emails.email": [email],
    },{"_id" : 1});
    if (email_exist) {
      return "same"
    } else {
      return "unique"
    }
  },
  uniqueUsername: async (uname) => {
        const user = await userSchema.findOne({ "data.un": uname },{"_id" : 1});
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
        oId: validatedResult.orgId,
      });
      var IdStatus = "unique";
      if (orgName) IdStatus = "same";
      return resolve(IdStatus);
    });
  },
  // uniqueStruc: async (validatedResult) => {
  //   return await 
  // }

};



