const createError = require(`http-errors`);
const { metaService } = require("../services");
const { metaValidation } = require("../validation");
const catchAsync = require("../utils/catchAsync");
const logger = require("../config/logger")

module.exports = {
  UniqueEmail: catchAsync(async (req, res, next) => {
    const validatedResult = await metaValidation.uniqueEmail().validateAsync(
      req.body
    );
    const emailStatus = await metaService.uniqueEmail(validatedResult.email);
    if (emailStatus) res.status(200).json({message:emailStatus});
    res.end();
  }),

  UniqueUsername: catchAsync(async (req, res, next) => {
    const validatedResult = await metaValidation.uniqueUsername().validateAsync(
      req.body,
      { abortEarly: false }
    );
    const usernameStatus = await metaService.uniqueUsername(validatedResult.username);
    if (usernameStatus) return res.status(200).json({message:usernameStatus});
    res.end();
  }),

UniqueOrgName : catchAsync(async (req, res, next)=>{

    const validatedOrgName = await metaValidation.validate_orgName().validateAsync(req.body)
    const nameStatus = await metaService.unique_orgName(validatedOrgName);
    if(nameStatus)
    res.status(200).json({message:nameStatus})
    res.end();
  }),

UniqueOrgId : catchAsync(async (req, res) => {
  
    const validateOrgId = await metaValidation.validate_orgId().validateAsync(req.body)
    const IdStatus = await metaService.unique_orgId(validateOrgId);
    if(IdStatus){
     return res.status(200).json({message:IdStatus})
    }
    res.end();
  }),
  // unique_struc_ctrl: catchAsync(async (req, res) => {
  //   const struc_name_val = await metaValidation.unique_struc().validateAsync(req.body)
  //   const roles  // Check roles if he is initiator or not 
  // })


};

