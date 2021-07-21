const UserMetaSchema = require('../model/User/UserMeta')
const createError = require(`http-errors`)
const {MyProfile} = require('../services/fetch.services')
const CreateOrg = require('../services/org.services')
const create_new = require('../validation/org.validation')
const { CreateOrg_srv ,unique_orgName_srv,unique_orgId_srv} = require('../services/org.services')
const { validate_org_joi,validate_orgName_joi,validate_orgId_joi } = require('../validation/org.validation')
const catchAsync = require('../utils/catchAsync')
// module.exports = {
//   CreateOrg_ctrl: async (req,res,next) => {
//      try {
//     if (res.locals.authenticated && res.locals.user) {
//       const userData = await MyProfile(res.locals.user.sub)
//       if(userData){
//         const validatedResult = await create_new().validateAsync(req.body)
//         const result = await CreateOrg_srv(validatedResult, userData)
//       }
//     }
//   } catch (error) {}
//   },
// };

exports.CreateOrg_ctrl =  catchAsync(async (req, res) => {

    if (!res.locals.authenticated && !res.locals.user)
      return res.status(404).send('Please Login In')

    const validatedOrg = await validate_org_joi().validateAsync(req.body)
    const userDetails = await MyProfile(res.locals.user.sub)
    const RegOrg = await CreateOrg_srv(userDetails,validatedOrg)

    if (RegOrg) 
      return res.status(200).send('Organisation Registered')
    
    return res.status(200).send('User Not Found')
 
})

exports.unique_orgName_ctrl = async (req, res)=>{

      if (!res.locals.authenticated && !res.locals.user)
          return res.status(404).send('Please Login In')

    const validatedOrg = await validate_orgName_joi().validateAsync(req.body)
    const nameStatus = await unique_orgName_srv(validatedOrg);
    if(nameStatus)
    res.status(200).send(nameStatus)
    res.end();
 }

exports.unique_orgId_ctrl =async (req, res) => {
  try {
         return res.status(200)
  }
  catch (err){

  }
}
