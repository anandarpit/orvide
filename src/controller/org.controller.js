const UserMetaSchema = require("../model/User/UserMeta");
const createError = require(`http-errors`);
const MyProfile = require("../services/fetch.services")
const CreateOrg = require('../services/org.services');
const create_new = require('../validation/org.validation')

module.exports = {
  UserProfile: async (req,res,next) => {
     try {
    if (res.locals.authenticated && res.locals.tokenPayload) {
      const userData = await MyProfile(res.locals.tokenPayload.sub)
      if(userData){
        const validatedResult = await create_new().validateAsync(req.body)
        const result = await CreateOrg(validatedResult, userData)
      }
    }
  } catch (error) {}
  },
};