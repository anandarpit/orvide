const connect = require("../helpers/connection");
const OrgSchema = require("../model/Org");
const UserSchema = require("../model/user/User");
const createError = require(`http-errors`);

module.exports = {
  CreateOrg: async (validatedResult, userData) => {
    return new Promise((resolve, reject) => {
      try {
        connect.then(async (db) => {
          const enable = null;
          if (validatedResult.orgDomain) enable = true;

          const data = new OrgSchema({
            orgId: validatedResult.orgId,
            orgName: validatedResult.orgName,
            orgDomain: { enabled: enable, domain: validatedResult.orgDomain },
          });

          await data.save((err, doc) => {
            if (err) return reject(err);
            else{

              const filter = { _id: userData._id}
              const userUpdate = new UserSchema({
                _id: userData._id,
                emails: [{ email: email }],
                username: username,
                name: { firstName, lastName },
              });
            }
          });
        });
      } catch (error) {}
    });
  },
};