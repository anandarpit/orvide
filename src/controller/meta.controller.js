const createError = require(`http-errors`);
const {metaService} = require("../services");
const {metaValidation} = require("../validation");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  UniqueEmail_ue00: catchAsync(async (req, res, next) => {
    const validatedResult = await metaValidation.uniqueEmail().validateAsync(
      req.body
    );
    const uniqueEmail = await metaService.uniqueEmail(validatedResult.email);
    if (uniqueEmail) res.status(200).send(uniqueEmail);
    res.end();
  }),

  UniqueUsername_uu00: catchAsync(async (req, res, next) => {
    const validatedResult = await metaValidation.uniqueUsername().validateAsync(
      req.body,
      { abortEarly: false }
    );
    const result = await metaService.uniqueUsername(validatedResult.uname);
    if (result) return res.status(200).send(result);
    res.end();
  }),

unique_orgName_ctrl : catchAsync(async (req, res, next)=>{

      // if (!res.locals.authenticated && !res.locals.user)
      //     return res.status(404).send('Please Login In')

    const validatedOrgName = await metaValidation.validate_orgName().validateAsync(req.body)
    const nameStatus = await metaService.unique_orgName(validatedOrgName);
    if(nameStatus)
    res.status(200).json({nameStatus})
    res.end();
 }),

unique_orgId_ctrl : catchAsync(async (req, res) => {
  
    const validateOrgId = await metaValidation.validate_orgId().validateAsync(req.body)
    const IdStatus = await metaValidation.unique_orgId(validateOrgId);
    if(IdStatus){
     return res.status(200).json({IdStatus})
    }
    res.end();
  
})
};


