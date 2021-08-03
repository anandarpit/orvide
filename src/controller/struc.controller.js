const UserMetaSchema = require("../model/User/UserMeta");
const createError = require(`http-errors`);
const { MyProfile } = require("../services/fetch.services");
const catchAsync = require("../utils/catchAsync");
const { createStructure_joi_cs00 } = require("../validation/struc.validation");

/**
 * What are we going to take from the user?
 * 1. Check if he is logged in - Already done at this point.
 * 2. Check if he is a member of the organization of the organization and check if he is allowed to create structure.
 * 3. If he is allowed to create structure, then take the request fields. The request fields by the user client include the following:
 * (i) the name of the structure.
 * (ii) the description of the structure.
 * (iii) the user is the initiator of the structure.
 * (iv) the organization id.
 */
exports.CreateStructure_ctrl_cs00 = catchAsync(async (req, res, next) => {
  const validatedResult = await createStructure_joi_cs00().validateAsync(
    req.body
  );


});
