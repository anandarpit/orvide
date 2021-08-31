const createError = require(`http-errors`);
const catchAsync = require("../utils/catchAsync");
const { roleValidation } = require("../validation/");
const { canMakeAdmin_func } = require("../functions/canMakeAdmin")
const {roleService} = require("../services")

exports.MakeAdmin = catchAsync(async (req, res, next) => {

    //Step 1: Body Validation - Done
    const validatedInput = await roleValidation.makeAdmin().validateAsync(req.body);
    
    const thisUserId = res.locals.payload.sub;
    const orgId = validatedInput.orgId;

    //Step 2: for checking the maker has the right permissions to make 
    const thisUserRole = await canMakeAdmin_func(thisUserId, orgId)
    console.log(thisUserRole[0])

    //TODO: bad code
    if((thisUserRole[0] && thisUserRole[0].data) && (thisUserRole[0].data.OWNER || (thisUserRole[0].data.ADMIN && thisUserRole[0].data.ADMIN.cma))){
        //Make Admin finally
        const result = await roleService.makeAdminService(validatedInput)
    }else{
       throw createError.BadRequest({code:"NA_00"})
    }
})