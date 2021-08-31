const createError = require(`http-errors`);
const { orgService } = require("../services");
const { orgValidation } = require("../validation");
const catchAsync = require("../utils/catchAsync");

exports.createOrg = catchAsync(async (req, res) => {
  const validatedOrg = await orgValidation
    .validate_org()
    .validateAsync(req.body);

  if (orgId) return res.status(201).json({ message: 'Registered' })
})



exports.updateInviteLinkStatus = catchAsync(async (req, res) => {
    
    const result = orgService.updateInviteLinkStatus(
        res.locals.payload.sub,
        validatedResult
    );
    if (result)
        res.status(201).json({ message: `Invite Link Status '${req.body.status}'` });
        
})

exports.getUserOrgDetails = catchAsync(async (req, res) => {
  const orgList = await orgService.getUserOrgDetail(res.locals.payload.sub)
    if (orgList) return res.status(200).json({ data: orgList });
  return res.status(204).json({message:"something went wrong"})
})

exports.getStructDetails = catchAsync(async (req, res) => {
    const structList = await orgService.getStructDetails(req.locals.payload.sub);
    if (orgList) return res.status(200).json({ data: structList });
    return res.status(204).json({ message: "something went wrong" });

})

