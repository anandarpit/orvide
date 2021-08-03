const connect = require("../config/connection");
const UserSchema = require("../model/user/User");
const createError = require(`http-errors`);
const orgSchema = require(`../model/Org`)

module.exports = {
  uniqueEmail: async (email) => {
    return new Promise(async (resolve, reject) => {
      try {
       
          const email_exist = await UserSchema.findOne({
            "emails.email": [email],
          });
          if (email_exist) {
            return resolve("same");
          } else return resolve("unique");
        
      } catch (error) {
        return reject(createError(500, { message: "Internal Server Error" }));
      }
    });
  },
  uniqueUsername: async (uname) => {
    return new Promise(async(resolve, reject) => {
      try {
        
          const user = await UserSchema.findOne({ username: uname });
          if (!user) {
            return resolve("unique");
          } else return resolve("same");
        
      } catch (error) {
        return reject(
          createError(500, { code: "UU1", message: "Some error occurred" })
        );
      }
    });
  },
 unique_orgName : async (validatedResult) => {
  return new Promise(async(resolve, reject) => {
      const orgName = await orgSchema.findOne({
          orgName: validatedResult.orgName
        })
        var nameStatus = 'unique'
        if (orgName) nameStatus = 'same'
        return resolve(nameStatus)
      
    
  })
},
unique_orgId: async (validatedResult) => {
  return new Promise(async(resolve, reject) => {
       const orgName = await orgSchema.findOne({
          orgId: validatedResult.orgId
        })
        var IdStatus = 'unique'
        if (orgName) IdStatus = 'same'
        return resolve(IdStatus)
      
    
  })
}
}
