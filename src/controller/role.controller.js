const createError = require(`http-errors`);
const catchAsync = require("../utils/catchAsync");
const { roleValidation } = require("../validation/");
const {canMakeAdmin_func} = require("../functions/canMakeAdmin")
// const {roleService} = require("../services")

exports.MakeAdmin = catchAsync(async (req, res, next) => {

    //Step 1: Body Validation - Done
    const validatedResult = await roleValidation.makeAdmin().validateAsync(req.body);
    
    const thisUserId = res.locals.payload.sub;
    const orgId = validatedResult.orgId;

    //Step 2: for checking the maker has the right permissions to make 
    const thisUserRole = await canMakeAdmin_func(thisUserId, orgId)
    console.log(thisUserRole[0])
    if(thisUserRole[0] && )
    

    //Step 3: for checking if the to-be-made-admin has the clean-chit to become admin 
    // const userRole = //A function here to check for the user

    // //Step 4: Make Admin finally
    // const result = await roleService.makeAdminService(roleData, userId, validatedResult)

    // // Step 5: Show the result finally
})