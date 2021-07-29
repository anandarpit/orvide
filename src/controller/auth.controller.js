const { signAccessToken } = require(`../helpers/tokens`);
const { generateMail, sendMail } = require("../helpers/GmailAPI.js");
const {
  loginUser_serv_lu00,
  verificationEmail_serv_ve00,
  registerUser_serv_ru00,
} = require("../services/auth.services");
const {
  loginUser_joi_lu00,
  registerUser_joi_ru00,
  verifyEmail_joi_ve00,
} = require("../validation/auth.validation");
const catchAsync = require("../utils/catchAsync");

exports.VerificationEmail_ctrl_ve00 = catchAsync(async (req, res, next) => {
  const validatedResult = await verifyEmail_joi_ve00().validateAsync(req.body, {
    abortEarly: false,
  });

  const mail = await generateMail(validatedResult);
  const result = await verificationEmail_serv_ve00(validatedResult, mail.OTP);

  if (result) {
    await sendMail(mail.receiverEmail, mail.subject, mail.body);
    const msg = [`Verification Mail sent at ${req.body.email}`, "success"];
    return res.set(200).json(msg);
  }
});

exports.RegisterUser_ctrl_ru00 = catchAsync(async (req, res, next) => {
  const validatedResult = await registerUser_joi_ru00().validateAsync(
    req.body,
    { abortEarly: false }
  );
  const result = await registerUser_serv_ru00(validatedResult);
  if (result) return res.status(200).send("registered");
  res.end();
});

exports.LoginUser_ctrl_lu00 = catchAsync(async (req, res, next) => {
  const validatedResult = await loginUser_joi_lu00().validateAsync(req.body, {
    abortEarly: false,
  });

  const userMeta = await loginUser_serv_lu00(
    validatedResult.email,
    validatedResult.username,
    validatedResult.password
  );
  if (userMeta) {
    const token = await signAccessToken(userMeta._id);
    if (token) {
      res.cookie("authorization", token, {
        maxAge: 1000 * 60 * 60, // 1 hour max age
        httpOnly: true,
      });
      res.status(200).send("you are now logged in as " + userMeta.username);
    }
  }
});