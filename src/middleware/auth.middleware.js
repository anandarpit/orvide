const jwt = require(`jsonwebtoken`);
const createError = require(`http-errors`);
const fs = require("fs");
const path = require("path");
const pathToPubKey = path.join(__dirname, "..", "config/key/id_rsa_pub.pem");
const { orgService } = require('../services')
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  isLoggedIn: catchAsync(async (req, res, next) => {
      const token = req.headers[`authorization`];
      if (!token) throw createError.BadRequest({code: "NT_00"});
      
      jwt.verify(token, PUB_KEY, (err, payload) => {
        if (err) {
          if (err.name == "JsonWebTokenError")
            throw createError.BadRequest({code: "IT_00"});
          else throw createError.InternalServerError();
        } else {
          res.locals.authenticated = true;
          res.locals.payload = payload;
          next();
        }
      });
  }),

  isCreator: catchAsync(async(req, res, next) =>{
  
    const creator = orgService.isCreator(res.locals.payload.sub);
    if (creator)
      next();
    else
      throw createError(403, { code: "INC_00" });
    

  }),

  isAlreadyLoggedIn: (req, res, next) => {
    // //TODO maybe we need to check for cookies for this one!
    // try {
    //   const token = req.headers[`authorization`];
    //   if (!token) {
    //   //   res.render(staticpath + "/login.ejs");
    //   res.send("unauthorized");
    //   }
    //   jwt.verify(token, PUB_KEY, (err, payload) => {
    //     if (err) {
    //       if (err.name == "JsonWebTokenError") {
    //       } else {
    //         res.status(400).send(err.message); //TODO unhandled error
    //       }
    //     } else {
    //       req.loginStatus = true;
    //       next();
    //       // res.status(403).send({message: "Already Logged in", payload})
    //     }
    //   });
    // } catch (error) {
    //   res.status(500).send(error.message); //TODO unhandled error
    // }
  },
};
