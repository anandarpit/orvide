const createError = require(`http-errors`);
const catchAsync = require("../utils/catchAsync");
const { createStructure_joi_cs00 } = require("../validation/struc.validation");
const {
  checkOrReturnRoles_corr00,
} = require("../functions/checkOrgReturnRoles");
const { createStructure } = require("../services/struc.services");

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
  const userData = await checkOrReturnRoles_corr00(
    userId,
    validatedResult.org_id
  );
  const err1 = userData.aRoles == undefined; 
  const err2 = userData.role == undefined;

  console.log("ERR1 "+ err1 + "ERR2 " + err2)
  if(!err1){
    if(userData.aRole.ini){
      await CreateStruc(validatedResult, userId)
    }else{
      throw createError.BadRequest({ code: "NP_01" });
    }
  }
  else if(!err2){
    if(userData.role.isInitiator){
      await CreateStruc(validatedResult, userId)
    }else{
      throw createError.BadRequest({ code: "NP_01" });
    }
  }else{
    throw createError.BadRequest({ code: "NA_00" });
  }
})

async function CreateStruc (validatedResult, userId){
  const result = await createStructure(validatedResult, userId);
  if(result == true){
    res.send("Structure Created!!")
  }
}

  // if (!err1 || !err2) {
  //   if (userData.aRoles.ini || userData.role.isInitiator) {
  //     const result = await createStructure(validatedResult, userId);
  //     console.log("incoming " + result);
  //   } else {
  //     throw createError.BadRequest({ code: "NP_01" });
  //   }
  // } else {
  //   throw createError.BadRequest({ code: "NA_00" });
  // }
