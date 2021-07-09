const createError = require(`http-errors`);
const router = require("express").Router();
const { signAccessToken} = require(`../helpers/tokens`);
const {isLoggedIn} = require('../middleware/auth.middleware')
const { loginUserService, registerEmailService } = require("../services/auth.services");
const { loginSchema, registerSchema, verifyEmail } = require("../validation/auth.validation");

const {
  RegisterUser1,
  RegisterUser2,
} = require("../services/auth.services");

exports.LoginUser = async(req, res, next) => {
 try {
    const validatedResult = await loginSchema().validateAsync(req.body);
    const userId = await loginUserService(
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
        res.send("Logged in!!");
      }
    }
  } catch (error) {
    //Checking for Validation Error
    if ((error.name = `ValidationError`))
      return res.status(400).send(createError(error.message));
    if (error.code = `ISE`) return res.send(error.message);
    if (error.code = `LU`) return res.send(error.message);
    return res.status(500).send(`Internal server error`);
  }
}

exports.RegisterUser = async(req,res, next)=>{
   try {
    const validatedResult = await registerSchema().validateAsync(req.body);
    const result1 = await RegisterUser1(
      validatedResult.email,
      validatedResult.otp
    );
    if (result1) {
      const result2 = await RegisterUser2(validatedResult, result1);
      if (result2) {
        return res.send("registered");
      }
    }
    res.end();
  } catch (error) {
    if ((error.name = `ValidationError` && error.isJoi)) {
   
      res.status(400).send(error.message);
    } else if ((error.name = `MongoError` && error.code === 11000)) {
    
      res.status(400).send(error);
    } else if ((error.code = "RU1")) {
      //"RU1" is a custom error code for RegisterUser1
      res.status(401).send(error.message.value);
    } else if ((error.code = "RE")) {
      //"RE" is a custom error code for RegisterEmail
      res.status(401).send(error.message.value);
    } else {
      res.status(500).send("Internal Service Error! :( ");
    }
  }
}

exports.VerifyEmail = async(req,res,next)=>{
  try {
    const validatedResult = await verifyEmail().validateAsync(req.body);
      console.log("validated Result");
      await registerEmailService(validatedResult)
      .then((result) => {
          const msg = [`Verification Mail sent at ${req.body.email}`,"success"]
        res.set(200).json(msg);
      })
      .catch((err) => {
        if ((err.name = `MongoError` && err.code === 11000)) {
          if (Object.keys(err.keyPattern)[0] === "email") {
            return res
              .set(200)
              .send(
                `A user already exists with the same Email. Please login instead!`
              );
          }
        } else if(err.code = "RE"){
          return res.set(200).send(err.message.value);
        }
      });
    res.end();
  } catch (error) {
    //Checking for Validation Error
    if (error) {
      if ((error.name = `ValidationError`)) {
        res.status(400).send(createError(error.message));
      } else {
        res.status(500).send(createError(`Internal Server Error :(`));
      }
    }
  }
}