const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const errCode = err.message.code;
    if (err.isJoi === true) err.status = 422;
    if (errCode === "EAR_00") err.message = "This email is already associated with another account";
    if (errCode === "UNF_00") err.message = "User not found";
    if (errCode === "UAT_00") err.message = "Username already taken";
    if (errCode === "IC_00") err.message = "Invalid Credentials";
    if (errCode === "AAV_00") err.message = "Account Already verified!";
    if (errCode === "OTP_EX") err.message = "OTP expired, try again!";
    if (errCode === "OTP_INV") err.message = "Invalid OTP";
    next(err);
  });
};

module.exports = catchAsync;
