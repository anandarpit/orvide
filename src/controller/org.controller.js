const UserMetaSchema = require('../model/User/UserMeta')
const createError = require(`http-errors`)
const {fetchService} = require('../services')
const CreateOrg = require('../services/org.services')
const create_new = require('../validation/org.validation')
const {orgService} = require('../services')
const { orgValidation } = require('../validation')
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

    const validatedOrg = await orgValidation.validate_org().validateAsync(req.body)
    const userDetails = await fetchService.MyProfile(res.locals.user.sub)
    const RegOrg = await orgService.CreateOrg(userDetails,validatedOrg)

    if (RegOrg) 
      return res.status(200).send('Organisation Registered')
    
    return res.status(200).send('User Not Found')
 
})


