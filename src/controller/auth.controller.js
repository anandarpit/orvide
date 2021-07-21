const createError = require(`http-errors`);
const { signAccessToken } = require(`../helpers/tokens`);
const {generateMail,sendMail} = require('../helpers/GmailAPI.js')
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

exports.VerificationEmail_ve00 = catchAsync( async (req, res, next) => {
    const validatedResult = await verifyEmail_joi_ve00().validateAsync(req.body,{abortEarly: false});
    const mail = await generateMail(validatedResult);
    const result = await verificationEmail_serv_ve00(validatedResult,mail.OTP)

      if(result){
        await sendMail(mail.receiverEmail,mail.subject,mail.body)
        const msg = [`Verification Mail sent at ${req.body.email}`, "success"];
        return res.set(200).json(msg);
        }
});

exports.LoginUser_lu00 = catchAsync(async (req, res, next) => {
    const validatedResult = await loginUser_joi_lu00().validateAsync(req.body,{abortEarly:false});
    
    const userId = await loginUser_serv_lu00(
      validatedResult.email,
      validatedResult.username,
      validatedResult.password
    );
    if (userId) {
      const token = await signAccessToken(userId);
      if (token) {
        res.cookie("authorization", token, {
          maxAge: 1000 * 60 * 60, // 1 hour max age
          httpOnly: true,
        });
        res.status(200).send("Logged in!!");
      }
    }
});

exports.RegisterUser_ru00 = catchAsync(async (req, res, next) => {
    const validatedResult = await registerUser_joi_ru00().validateAsync(
      req.body,{ abortEarly:False}
    );
    const result = await registerUser_serv_ru00(validatedResult);
    if (result) return res.status(200).send("registered");
    res.end();
});

