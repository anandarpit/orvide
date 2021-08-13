const { orgValidation, authValidation, metaValidation } = require('../validation');

exports.orgInviteLink = async(req, res, next) => {
    const { error } = orgValidation.orgInviteLink().validate(req.body);
    if (error) return next(error);
    else next();
}