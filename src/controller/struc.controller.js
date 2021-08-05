const UserMetaSchema = require("../model/user/UserMeta");
const createError = require(`http-errors`);
const { MyProfile } = require("../services/fetch.services");
const catchAsync = require("../utils/catchAsync");
const { createStructure_joi_cs00 } = require("../validation/struc.validation");
const { userBelongsToOrg_uo00 } = require("../functions/user-org-check");

/**
 * What are we going to take from the user?
 * 1. The request fields by the user client include the following:
 * (i) the name of the structure.
 * (ii) the description of the structure.
 * (iii) the user is the initiator of the structure.
 * (iv) the organization id.
 * 2. Check if he is logged in - Already done at this point.
 * 3. Check if he is a member of the organization of the organization and check if he is allowed to create structure.
 * 4. If he is allowed to create structure, then process the request fields.
 */
exports.CreateStructure_ctrl_cs00 = catchAsync(async (req, res, next) => {
  const validatedResult = await createStructure_joi_cs00().validateAsync(
    req.body
  );
  const userId = res.locals.payload.sub;
  const userData = await userBelongsToOrg_uo00(userId, validatedResult.org_id);
  if (userData) {
    //Check if he has the permission to initiate a structure
    // throw createError.BadRequest({code: "NT_00"})
    console.log(userData)
    const roleId = userData.joinedOrgs
  }
});
