const createError = require(`http-errors`);
const UserSchemas = require(`../model/User/UserMeta`)
const catchAsync = require("../utils/catchAsync");


exports.otp = catchAsync(async (req, res, next)=>{
const email = req.body.email;
const user = await UserSchemas.findOne({email:email});
if(user){
    const otp = user.emailVerification.verificationOtp
    res.status(200).json({otp:otp})
}else{
res.sendStatus(400);

}
})