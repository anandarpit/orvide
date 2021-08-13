const createError = require(`http-errors`);
const users = require(`../../src/model/users`);
const catchAsync = require("../../src/utils/catchAsync");
const { signAccessToken } = require(`../../src/config/tokens`);
const {authService} = require("../../src/services");
const testSchema = require(`../model/tests`);
const arraySchema = require(`../model/arrays`)
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
exports.putData = catchAsync(async (req, res, next)=>{
  
  for(var i =0;i<100000;i++){
    const details = new testSchema({uId:i})
    await details.save((err, doc)=>{
      if(err) 
      console.log("saving error in test");
    });
  }
  res.sendStatus(200);
})
 exports.putDataArrays = catchAsync(async (req, res, next)=>{
   for(var i = 0 ; i<5; i++){
     const details = new arraySchema({uId:i,orgId})
     await details.save();
     for(var j=0 ; j<20 ;j++){

       for(var k = 0; k < 5; k++ ){
         const details = new arraySchema({
           uId:k+j+i,
           orgId:i
           
           
           })
           await details.save();
       }
     }
   }
   res.sendStatus(200);
 })

