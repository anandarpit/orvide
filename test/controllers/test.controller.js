const createError = require(`http-errors`);
const users = require(`../../src/model/users`);
const catchAsync = require("../../src/utils/catchAsync");
const { signAccessToken } = require(`../../src/config/tokens`);
const {authService} = require("../../src/services");
const logger = require(`../../src/config/logger`);

exports.fetchOTP = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const user = await users.findOne({ 'eVer.tempEmail': 'initiatetenet@gmail.com' },{ 'eVer.otp': 1 });
  
  if (user) {
    const otp = user.eVer.otp;
    res.status(200).json({ otp: otp });
  } else {
    res.sendStatus(400);
  }
});

exports.fetchToken = catchAsync(async (req, res, next)=>{
    const {email,username, password} = req.body; 
    const userMeta = await authService.loginUser(email, username, password);
  const token = await signAccessToken(userMeta._id);
  res.status(200).json({token: token});
})




