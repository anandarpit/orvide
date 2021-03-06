const createError = require(`http-errors`);
const catchAsync = require("../utils/catchAsync");
const { strucValidation } = require("../validation/");
const {
  checkOrReturnRoles_corr00,
} = require("../functions/checkOrgReturnRoles");
const { strucService } = require("../services");

/**
 * !in req.body:
 * * the organization id.
 * * the name of the structure.
 * * the description of the structure.
 * * unionRoom enabled or not.
 */

exports.CreateStructure_ctrl_cs00 = catchAsync(async (req, res, next) => {
  const validatedResult = await strucValidation.createStructure().validateAsync(
    req.body
  );
  const userId = res.locals.payload.sub;
  // const roleData = await checkOrReturnRoles_corr00(
  //   userId,
  //   validatedResult.org_id
  // );
    // const roleData = null;//this was temporary
  const result = await strucService.createStruc(validatedResult, userId, roleData)
  if(result){
    return res.status(201).json({message: "Structure created successfully"})
  }
})