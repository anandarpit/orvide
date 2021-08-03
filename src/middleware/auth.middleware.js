const jwt = require(`jsonwebtoken`);
const createError = require(`http-errors`);
const fs = require("fs");
const path = require("path");
// const express = require("express");
// const app = require("express")();
const pathToPubKey = path.join(__dirname,"..", "helpers/key/id_rsa_pub.pem");

const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");


module.exports ={
 isLoggedIn : (req, res, next) =>{
  try {
    const token = req.headers[`authorization`];
    if (!token) next(createError.BadRequest({ code: "NT_00"}));

    jwt.verify(token, PUB_KEY, (err, payload) => {
      if (err) {
        if (err.name == "JsonWebTokenError")
          next(createError.BadRequest({ code: "IT_00"}));
        else
          next(
            createError.InternalServerError()
          );
      } else {
        res.locals.authenticated = true;
        res.locals.payload = payload;
        next();
      }
    });
  } catch (error) {
    console.log(error);
  }
},

isAlreadyLoggedIn : (req, res, next)=> {
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

}
