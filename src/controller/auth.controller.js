const { signAccessToken } = require(`../config/tokens`);
const { generateMail, sendMail } = require("../utils/GmailAPI.js");
const {authService} = require("../services");
const {authValidation} = require("../validation");
const catchAsync = require("../utils/catchAsync");

exports.VerificationEmail_ctrl_ve00 = catchAsync(async (req, res, next) => {
  const validatedResult = await authValidation.verifyEmail().validateAsync(req.body, {
    abortEarly: false,
  });

  const mail = await generateMail(validatedResult);
  const result = await authService.verificationEmail(validatedResult, mail.OTP);

  if (result==true) {
    await sendMail(mail.receiverEmail, mail.subject, mail.body);
    const msg = [`Verification Mail sent at ${req.body.email}`, "success"];
    return res.set(200).json(msg);
  }
});

exports.RegisterUser_ctrl_ru00 = catchAsync(async (req, res, next) => {
  const validatedResult = await authValidation.registerUser().validateAsync(
    req.body,
    { abortEarly: false }
  );
  const result = await authService.registerUser(validatedResult);
  if (result) return res.status(200).send("Registered")
});

exports.LoginUser_ctrl_lu00 = catchAsync(async (req, res, next) => {
  const validatedResult = await authValidation.loginUser().validateAsync(req.body, {
    abortEarly: false,
  });

  const result = await authService.loginUser(
    validatedResult.email,
    validatedResult.username,
    validatedResult.password
  );

  if (result) {
    const token = await signAccessToken(result._id);
    if (token) {
      res.cookie("authorization", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, //Currently valid for seven days // TODO: Change this!
        httpOnly: true,
      });
      res.status(200).send("You are now logged in as " + result.data.un);
    }
  }
});