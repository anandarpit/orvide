const createError = require(`http-errors`);
const UserMetas = require(`../../src/model/User/UserMeta`);
const catchAsync = require("../../src/utils/catchAsync");

exports.fetchOTP_test = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const user = await UserMetas.findOne({ email: email });
  if (user) {
    const otp = user.emailVerification.verificationOtp;
    res.status(200).json({ otp: otp });
  } else {
    res.sendStatus(400);
  }
});
