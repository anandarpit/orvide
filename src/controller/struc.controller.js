const createError = require(`http-errors`);
const catchAsync = require("../utils/catchAsync");
const { createStructure_joi_cs00 } = require("../validation/struc.validation");
const { checkOrReturnRoles_corr00 } = require("../functions/checkOrgReturnRoles");
const { createStructure } = require('../services/struc.services')

/**
 * !in req.body: 
 * * the organization id.
 * * the name of the structure.
 * * the description of the structure.
 * * unionRoom enabled or not.
 */

exports.CreateStructure_ctrl_cs00 = catchAsync(async (req, res, next) => {
  const validatedResult = await createStructure_joi_cs00().validateAsync(
    req.body
  );
  const userId = res.locals.payload.sub;
  const userData = await checkOrReturnRoles_corr00(userId, validatedResult.org_id);
  console.log("HEllo ",userData)
  if (userData) {
    if(userData[0].aRoles.ini || userData[0].roles.isInitiator){
      const result = await createStructure(validatedResult, userId)
      console.log("incoming "+result)
    }else{
      throw createError.BadRequest({code: "NP_01"})
    }
  }else{
    throw createError.BadRequest({code : "NA_00"})
  }
});
