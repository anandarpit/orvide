const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const UserMetaSchema = require("../model/user/UserMeta")
const passwordGen = require("../passwordHash");
const createError = require(`http-errors`);
const sendMail = require("../helpers/GmailAPI")
const crypto = require('crypto');


function randomValueHex(len) {
  return crypto.randomBytes(Math.ceil(len / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, len).toUpperCase();   // return required number of characters
}

module.exports = {
  RegisterEmail: (validatedResult) => {
    return new Promise((resolve, reject) => {
      try {
        const { email, password } = validatedResult;

        const passwordData = passwordGen.genPassword(password);
        const hash = passwordData.hash;
        const salt = passwordData.salt;

        const OTP = randomValueHex(6)

        connect.then((db) => {
          const RegEmail = new UserMetaSchema({
            email: email,
            password: { salt, hash },
            emailVerification: { isVerified: false, verificationOtp: OTP },
            hasCompletedRegistration: false
          })

          RegEmail.save((err, doc) => {
            if (err) return reject(err);
            else {
              //For Email
              const receiverEmail = email
              const subject = 'Your verification OTP'
              const body = OTP

              sendMail(receiverEmail, subject, body)
                .then((result) => {
                  return resolve(doc)
                })
                .catch((error) => {
                  return reject(error)
                })
              ;
            }
          })
        })
      } catch (error) {
        if (error) return reject(error)
      }
    })
  },

  RegisterSchema: (data, res) => {
    return new Promise((resolve, reject) => {
      try {
        const { firstName, lastName, email, password, username } = data;
        const passwordData = passwordGen.genPassword(password);
        const hash = passwordData.hash;
        const salt = passwordData.salt;

        //TODO remove username=email
        connect.then((db) => {
          const saveDetails = new UserSchema({
            username: email,
            name: { firstName, lastName },
            email: email,
            password: { salt, hash },
          });

          //TODO handle errors here more gracefully
          saveDetails.save(function (err, doc) {
            if (err) {
              if ((err.name = `MongoError` && err.code === 11000)) {
                //error.code = 11000 means duplicate user found!
                res
                  .status(409)
                  .send(createError.BadRequest("User Already Exists"));
                return reject();
              } else {
                res.send(createError(err.message)); //TODO unchecked error response
                return reject();
              }
            }
            console.log(doc);
            return resolve(doc);
          });
        });
      } catch (error) {
        console.log(error.messages);
        res.send(
          createError.InternalServerError(
            "An internal server error occurred :("
          )
        );
      }
    });
  },

  LoginUser: (validatedResult, res) => {
    return new Promise((resolve, reject) => {
      try {
        const email = validatedResult.username;
        const password = validatedResult.password;

        connect.then((db) => {
          UserSchema.findOne({ email })
            .then((user) => {
              if (!user) {
                res.status(404).send(createError("No user found with that email"));
                return reject();
              }
              const hash = user.password.hash;
              const salt = user.password.salt;
              if (!passwordGen.validPassword(password, hash, salt)) {
                res.send(403).send(createError("Incorrect Credentials"));
                return reject();
              }
              return resolve(user._id);
            })
        });
      } catch (error) {
        res.status(500).send(createError.InternalServerError("Internal Server Error"))
        return reject();
      }
    });
  },
};
