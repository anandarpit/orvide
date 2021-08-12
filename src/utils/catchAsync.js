const createError = require(`http-errors`);
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    const errCode = err.message.code
    if (err.isJoi === true) err.status = 422;
    else if (errCode === "EAR_00") err.message = "This email is already associated with another account";//Email Already Registered
    else if (errCode === "UNF_00") err.message = "User not found";
    else if (errCode === "UAT_00") err.message = "Username already taken";
    else if (errCode === "IC_00") err.message = "Invalid Credentials";
    else if (errCode === "AAV_00") err.message = "Account Already verified!";
    else if (errCode === "NLI_00") err.message = "Not Logged in";
    else if (errCode === "NT_00") err.message = "No Token";
    else if (errCode === "IT_00") err.message = "Invalid Token";
    else if (errCode === "NA_00") err.message = "Not Authorized";
    //Name taken
    else if (errCode === "NAT_01") err.message = "Structure name already taken in this Org!";
    //OTP
    else if (errCode === "OTP_01") err.message = "OTP expired, try again!";
    else if (errCode === "OTP_02") err.message = "Invalid OTP";
    //No permission
    else if (errCode === "NP_01") err.message = "You do not have the permission to create new Structures.";
    next(err);
  });
};

module.exports = catchAsync;