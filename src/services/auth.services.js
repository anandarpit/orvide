const mongoose = require("mongoose");
const connect = require("../config/connection");
const UserSchema = require("../model/user/User");
const UserMetaSchema = require("../model/User/UserMeta");
const { genPassword, validPassword } = require("../utils/passwordHash");
const createError = require(`http-errors`);

module.exports = {
  verificationEmail: async (validatedResult, OTP) => {
    const { email, password } = validatedResult;

    const passwordData = genPassword(password);
    const hash = passwordData.hash;
    const salt = passwordData.salt;

    const RegEmail = {
      email: email,
      password: {
        salt,
        hash,
      },
      emailVerification: {
        isVerified: false,
        verificationOtp: OTP,
        expiryTime: Date.now() + 600000, // will be expired in 10 mins
      },
    };

    const user = await UserSchema.findOne({
      "emails.email": email,
    });
    if (!user) {
      const result = await UserMetaSchema.updateOne(
        { email: email },
        RegEmail,
        { upsert: true }
      );
      //The updateOne method returns a mongoose document with details of success or not, and not the updated document, so do not forget to use 'result.nModified' as its value will be 1 if an update was done or 0 if not. Also use 'result.upserted' as it will contain the objects for newly added document to the collection since in upsertion alone produces 'nModified: 0'
      if (result.nModified || result.upserted) {
        return true;
      } else {
        throw createError(500);
      }
    } else {
      throw createError.BadRequest({ code: "EAR_00" });
    }
  },

  loginUser: async (email, username, password) => {
    let userMeta;
    if (email) {
      userMeta = await UserMetaSchema.findOne({
        email,
      });
    } else if (username) {
      userMeta = await UserMetaSchema.findOne({
        username,
      });
    }

    if (!userMeta)
      throw createError.BadRequest({
        code: "UNF_00",
      });

    const hash = userMeta.password.hash;
    const salt = userMeta.password.salt;

    if (!validPassword(password, hash, salt)) {
      throw createError.BadRequest({
        code: "IC_00",
      });
    } else {
      return userMeta;
    }
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
  registerUser: (validatedResult) => {
    return new Promise(async (resolve, reject) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const email = validatedResult.email;
        const otp = validatedResult.otp;
        const userMeta = await UserMetaSchema.findOne({
          email,
        }).session(session);

        if (!userMeta)
          return reject(
            createError.BadRequest({
              code: "UNF_00",
            })
          );
        else {
          if (userMeta.emailVerification.isVerified)
            return reject(
              createError.BadRequest({
                code: "AAV_00",
              })
            );
          else if (userMeta.emailVerification.expiryTime <= Date.now())
            return reject(
              createError.BadRequest({
                code: "OTP_EX",
              })
            );
          else if (userMeta.emailVerification.verificationOtp != otp)
            return reject(
              createError.BadRequest({
                code: "OTP_INV",
              })
            );
          else if (userMeta.emailVerification.verificationOtp === otp) {
            const { firstName, lastName, email, username } = validatedResult;

            const reg = new UserSchema({
              _id: userMeta._id,
              emails: [
                {
                  email: email,
                },
              ],
              username: username,
              name: {
                firstName,
                lastName,
              },
            });

            await reg.save({
              session,
            });

            userMeta.emailVerification.isVerified = true;
            userMeta.emailVerification.verificationOtp = undefined;
            userMeta.emailVerification.expiryTime = undefined;
            userMeta.username = username;
            await userMeta.save();

            await session.commitTransaction();
            return resolve(true);
          }
        }
      } catch (err) {
        await session.abortTransaction();

        if (err.code == 11000) {
          return reject(createError.BadRequest({ code: "UAT_00" }));
        } else {
          return reject(createError.InternalServerError());
        }
      } finally {
        session.endSession();
      }
    });
  },
};
