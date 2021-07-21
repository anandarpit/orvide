const mongoose = require("mongoose");
const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const UserMetaSchema = require("../model/User/UserMeta");
const {genPassword, validPassword} = require("../helpers/passwordHash");
const createError = require(`http-errors`);
const sendMail = require("../helpers/GmailAPI");
const crypto = require("crypto");



module.exports = {
  verificationEmail_serv_ve00: async (validatedResult,mail) => {
    return new Promise((resolve , reject) => {
      
         const { email, password } = validatedResult;

        const passwordData = genPassword(password);
        const hash = passwordData.hash;
        const salt = passwordData.salt;

               //The fields to be saved!
        const RegEmail = new UserMetaSchema({
          email: email,
          password: { salt, hash },
          emailVerification: {
            isVerified: false,
            verificationOtp: mail.OTP,
            expiryTime: Date.now() + 600000, // will be expired in 10 mins
          },
          hasCompletedRegistration: false,
        });

        connect.then(async (db) => {
          const user = await UserSchema.findOne({ "emails.email": email });
          if (!user) {
            RegEmail.save((err, doc) => {
              if (err) return reject(createError(500,{err:"Internal Server Error"}));
              return resolve(true);
              
            });
          }
            return reject(
              createError.BadRequest({value: "This email is already registered in some account"})
            );
        }).catch((err) => {
          return reject(createError.InternalServerError({value:"Oops , Try again later"}))
        })
      
    });
  },

  loginUser_serv_lu00: async (email, username, password) => {
    return new Promise((resolve, reject) => {
      try {
        connect.then(async (db) => {
          var userMeta = null;
          if (email) userMeta = await UserMetaSchema.findOne({ email });
          else if (username)
            userMeta = await UserMetaSchema.findOne({ username });

          if (!userMeta)
            return reject(
              createError(400, { code: "lu00", message: "user not found" })
            );
          const hash = userMeta.password.hash;
          const salt = userMeta.password.salt;
          if (!validPassword(password, hash, salt))
            return reject(
              createError(400, { code: "lu00", message: "invalid credentials" })
            );
          return resolve(userMeta._id);
        });
      } catch (error) {
        return reject(
          createError(500, { code: "ISE", message: "internal server error" })
        );
      }
    });
  },

  /**
   * STEPS
   * 1. First see if the OTP is valid or not
   * 2. Then,
   *    (i) = if OTP is valid, and not expired then add the use to Users collection
   *          and when the username has been saved, save it again in the UserMeta collection also.
   *    (ii) = if the OTP is invalid, return that the OTP is invalid.
   *    (iii) = if the OTP is valid but expired than return as expired and register again!!
   *
   * This has been covered in steps RegisterUser1 and RegisterUser2
   */
  registerUser_serv_ru00: async (validatedResult) => {
    return new Promise((resolve, reject) => {
      connect.then(async (db) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
          const email = validatedResult.email;
          const otp = validatedResult.otp;
          const userMeta = await UserMetaSchema.findOne({ email }).session(session);

          if (!userMeta)
            return reject(
              createError.BadRequest({
                code: "ru00",
                value: "User does not exist! Please Register",
              })
            );
          else {
            if (userMeta.emailVerification.isVerified)
              return reject(
                createError.BadRequest({
                  value: "Account Already verified!",
                  code: "ru00",
                })
              );
            else if (userMeta.emailVerification.expiryTime <= Date.now())
              return reject(
                createError.BadRequest({
                  value: "OTP EXPIRED... TRY AGAIN!!!",
                  code: "ru00",
                })
              );
            else if (userMeta.emailVerification.verificationOtp != otp)
              return reject(
                createError.BadRequest({
                  value: "Invalid OTP",
                  code: "ru00",
                })
              );
            else if (userMeta.emailVerification.verificationOtp === otp) {
              const { firstName, lastName, email, username } = validatedResult;

              const reg = new UserSchema({
                _id: userMeta._id,
                emails: [{ email: email }],
                username: username,
                name: { firstName, lastName },
              });

              await reg.save({ session }).catch((err) => {
                return reject(createError.InternalServerError({ code: "ISE", value: "Some error occurred"}))
              })

              userMeta.emailVerification.isVerified = true;
              userMeta.emailVerification.verificationOtp = undefined;
              userMeta.emailVerification.expiryTime = undefined;
              userMeta.username = username;
              await userMeta.save();
              
              await session.commitTransaction();
              return resolve(true)
            }
          }
        } catch (error) {
          await session.abortTransaction();
          console.error(error);
          return reject(createError.InternalServerError({ code: "ISE", value: "Something went wrong"}))
        } finally {
          session.endSession();
        }
      });
    });
  },
};
