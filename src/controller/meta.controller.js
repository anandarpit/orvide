const createError = require(`http-errors`);
const router = require("express").Router();
const {VerifyEmail} = require("../controller/meta.controller");
const {unique_email} =require('../validation/meta.validation')

module.exports = {
unique_email : async(req,res, next)=>{


try{
        // const validatedResult = await unique_email().validateAsync(req.body);

    const uniqueEmail = await VerifyEmail(req.body.email);
    res.status(200).send(uniqueEmail);
    }
    catch(err){
        console.log(err);
    }
},


unique_uname : async(req,res,next)=>{
  try {
        const validatedResult = await uname_unique().validateAsync(req.body);
        const result = await unameUsername(validatedResult.uname);
        if(result){return res.status(200).send(result); }
        else return res.end()

    } catch (error) {
        if(error.code = `UU1`) return res.send(error.message)
        return res.set(500).send("Internal Server Error")
    }
}
}