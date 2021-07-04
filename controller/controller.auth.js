const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const UserMetaSchema = require("../model/User/UserMeta");
const passwordGen = require("../helpers/passwordHash");
const createError = require(`http-errors`);
const sendMail = require("../helpers/GmailAPI");
const crypto = require("crypto");

function randomValueHex(len) {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
}

module.exports = {
  RegisterEmail: (validatedResult) => {
    return new Promise((resolve, reject) => {
      try {
        const { email, password } = validatedResult;

        const passwordData = passwordGen.genPassword(password);
        const hash = passwordData.hash;
        const salt = passwordData.salt;

        const OTP = randomValueHex(6);

        //For Email
        const receiverEmail = email;
        const subject = "Your verification OTP";
        const body = "Your OTP is: " + OTP;

        connect.then(async (db) => {
          const user = await UserSchema.findOne({ "emails.email": email });
          if (!user) {
            const RegEmail = new UserMetaSchema({
              email: email,
              password: { salt, hash },
              emailVerification: {
                isVerified: false,
                verificationOtp: OTP,
                expiryTime: Date.now() + 600000, // will be expired in 10 mins
              },
              hasCompletedRegistration: false,
            });

            RegEmail.save((err, doc) => {
              if (err) return reject(err);
              else {
                sendMail(receiverEmail, subject, body)
                  .then((result) => {
                    return resolve(doc);
                  })
                  .catch((error) => {
                    return reject(error);
                  });
              }
            });
          } else
            return reject(
              createError.BadRequest({
                code: "RE",
                value: "This email is already registered in some account",
              })
            );
        });
      } catch (error) {
        if (error) return reject(error);
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
  RegisterUser1: async (email, otp) => {
    return new Promise((resolve, reject) => {
      try {
        connect.then(async (db) => {
          const userMeta = await UserMetaSchema.findOne({ email });
          if (!userMeta)
            return reject(
              createError.BadRequest({
                code: "RU1",
                value: "User does not exist! Please Register",
              })
            );
          else {
            if (!userMeta.emailVerification.isVerified) {
              if (userMeta.emailVerification.expiryTime >= Date.now()) {
                if (userMeta.emailVerification.verificationOtp === otp) {
                  return resolve(userMeta._id);
                } else
                  return reject(
                    createError.BadRequest({
                      value: "Invalid OTP",
                      code: "RU1",
                    })
                  );
              } else
                return reject(
                  createError.BadRequest({
                    value: "OTP EXPIRED... TRY AGAIN!!!",
                    code: "RU1",
                  })
                );
            } else
              return reject(
                createError.BadRequest({
                  value: "Account Already verified!",
                  code: "RU1",
                })
              );
          }
        });
      } catch (error) {
        return reject(error);
      }
    });
  },

  RegisterUser2: (validatedResult, id) => {
    return new Promise((resolve, reject) => {
      try {
        const { firstName, lastName, email, username } = validatedResult;

        connect.then(async (db) => {
          const Reg = new UserSchema({
            _id: id,
            emails: [{ email: email }],
            username: username,
            name: { firstName, lastName },
          });

          await Reg.save((err, doc) => {
            if (err) return reject(err);
            else {
              const filter = { _id: id };
              const data = {
                username: username,
                emailVerification: { isVerified: true },
              };
              UserMetaSchema.updateOne(filter, data, (err, doc) => {
                console.log(id);
                if (err) return reject(err);
                else return resolve(doc);
              });
            }
          });
        });
      } catch (error) {
        return reject(error);
      }
    });
  },

  LoginUser: (email, username, password) => {
    return new Promise((resolve, reject) => {
      try {
        connect.then(async (db) => {
          var userMeta = null;
          if (email)
          userMeta = await UserMetaSchema.findOne({ email });
          else if (username)
          userMeta = await UserMetaSchema.findOne({ username });

          if (!userMeta)
            return reject(
              createError(400, { code: "LU", message: "user not found" })
            );
          const hash = userMeta.password.hash;
          const salt = userMeta.password.salt;
          if (!passwordGen.validPassword(password, hash, salt))
            return reject(
              createError(400, { code: "LU", message: "invalid credentials" })
            );
          return resolve(userMeta._id);
        });
      } catch (error) {
        return reject(createError(500, {code: "ISE", message: "internal server error"}));
      }
    });
  },
};
