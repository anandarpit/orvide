const UserSchema = require('../model/User/UserMeta')

exports.getOTP=async(req,res)=>{
   const user = await UserSchema.findOne({email:req.body.email});
   if(user){
       const userOtp = {otp:user.emailVerification.verificationOtp};
       
       res.status(200).json(userOtp);
   }
}