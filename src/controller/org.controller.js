const createError = require(`http-errors`)
const { orgService } = require('../services')
const { orgValidation } = require('../validation')
const catchAsync = require('../utils/catchAsync')

exports.createOrg = catchAsync(async (req, res) => {
    const validatedOrg = await orgValidation
        .validate_org()
        .validateAsync(req.body);
    
  const orgId = await orgService.createOrg(res.locals.payload.sub, validatedOrg)

  if (orgId) return res.status(200).json({ message: 'Registered' })
})

exports.getOrg = catchAsync(async (req, res) => {
  const orgList = await orgService.getOrg(res.locals.payload.sub)
  if (orgList) return res.status(200).json({ data: orgList })
})

exports.updateInviteLinkStatus = catchAsync(async (req, res) => {
    const validatedResult = await orgValidation
        .inviteLinkStatus()
        .validateAsync(req.body);
    
    const result = orgService.updateInviteLinkStatus(
        res.locals.payload.sub,
        validatedResult
    );
    if (result)
        res.status(201).json({ message: `Invite Link Status '${req.body.status}'` });
        
})
