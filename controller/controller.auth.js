const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const UserMetaSchema = require("../model/user/UserMeta");
const passwordGen = require("../passwordHash");
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

        connect.then((db) => {
          const RegEmail = new UserMetaSchema({
            email: email,
            password: { salt, hash },
            emailVerification: {
              isVerified: false,
              verificationOtp: OTP,
              issuedTime: Date.now(),
            },
            hasCompletedRegistration: false,
          });

          RegEmail.save((err, doc) => {
            if (err) return reject(err);
            else {
              //For Email
              const receiverEmail = email;
              const subject = "Your verification OTP";
              const body = OTP;

              sendMail(receiverEmail, subject, body)
                .then((result) => {
                  return resolve(doc);
                })
                .catch((error) => {
                  return reject(error);
                });
            }
          });
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
   */
  RegisterUser1: async (validatedResult) => {
    return new Promise((resolve, reject) => {
      try {
        const { email, otp } = validatedResult;

        connect.then(async (db) => {
          const userMeta = await UserMetaSchema.findOne({ email });
          if (!userMeta) return reject(false);
          else {
            if (userMeta.emailVerification.verificationOtp === otp) {
              return resolve(true);
            }
            return createError.BadRequest("OTP does not match!");
          }
        })
        
      } catch (error) {
        return reject (error);
      }
    });
  },

  RegisterUser2: (validatedResult) => {
    return new Promise((resolve, reject) => {
      try {
        const { firstName, lastName, email, username } = validatedResult;

        connect.then(async (db) => {
          const user = await UserSchema.findOne({ username });
          if (!user) {
            const Reg = new UserSchema({
              email,
              username,
              name: { firstName, lastName },
            });

            Reg.save((err, doc) => {
              if (err) return reject(err);
              else {
                const query = { _id: validatedResult._id };
                const usernameUpdate = new UserMetaSchema({
                  username: validatedResult.username,
                });
                UserMetaSchema.findOneAndUpdate(
                  query,
                  usernameUpdate,
                  (err, doc) => {
                    if (err) return reject(err);
                    else return resolve(true);
                  }
                );
              }
            });
          } else return reject(createError(200, "Username already taken!"));
        });
      } catch (error) {
        return error;
      }
    });
  },

  LoginUser: (validatedResult, res) => {
    return new Promise((resolve, reject) => {
      try {
        const email = validatedResult.username;
        const password = validatedResult.password;

        connect.then((db) => {
          UserSchema.findOne({ email }).then((user) => {
            if (!user) {
              res
                .status(404)
                .send(createError("No user found with that email"));
              return reject();
            }
            const hash = user.password.hash;
            const salt = user.password.salt;
            if (!passwordGen.validPassword(password, hash, salt)) {
              res.send(403).send(createError("Incorrect Credentials"));
              return reject();
            }
            return resolve(user._id);
          });
        });
      } catch (error) {
        res
          .status(500)
          .send(createError.InternalServerError("Internal Server Error"));
        return reject();
      }
    });
  },
};
