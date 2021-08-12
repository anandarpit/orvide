const mongoose = require("mongoose");
const UserSchema = require("../model/users");
const { genPassword, validPassword } = require("../utils/passwordHash");
const createError = require(`http-errors`);
const { catchAsync } = require("../config/connection");

module.exports = {
  verificationEmail: async (validatedResult, OTP) => {
    const { email, password } = validatedResult;

    const passwordData = genPassword(password);
    const hash = passwordData.hash;
    const salt = passwordData.salt;

    //Checking if the user with the same email exists already!
    const user = await UserSchema.findOne({
      "emails.email": email,
    });

    if (!user) {
      const dataS = {
        eVer: {
          tempEmail: email,
          isVer: false, //No need for this as default: false
          otp: OTP,
          eTime: Date.now() + 6000000, //todo
        },
        data: {
          password: {
            salt,
            hash,
          },
        },
      };
      const filter = {
        "eVer.tempEmail": email,
        "eVer.isVer": false,
        // "data.pEmail": { $exists: false },
      };

      const result = await UserSchema.updateOne(filter, dataS, {
        upsert: true,
      });
      //The updateOne method returns a mongoose document with details of 'success', and not the updated document, so do not forget to use 'result.nModified' as its value will be 1 if an update was done or 0 if not. Also use 'result.upserted' as it will contain the objects for newly added document to the collection since in upsertion alone produces 'nModified: 0'
      if (result.nModified || result.upserted) {
        return true;
      } else {
        throw createError.InternalServerError();
      }
    } else {
      throw createError.BadRequest({ code: "EAR_00" });
    }
  },

  loginUser: async (email, username, password) => {
    let userMeta;
    if (email) {// TODO: use aggregate pipeline here
      result = await UserSchema.findOne({
        "data.pEmail": email,
      });
    } else if (username) {
      result = await UserSchema.findOne({
        "data.un": username,
      });
    }

    if (!result) {
      throw createError.BadRequest({
        code: "UNF_00",
      });
    }

    const hash = result.data.password.hash;
    const salt = result.data.password.salt;

    if (!validPassword(password, hash, salt)) {
      throw createError.BadRequest({
        code: "IC_00",
      });
    } else {
      return result;
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
      const email = validatedResult.email;
      const otp = validatedResult.otp;
      const user = await UserSchema.findOne({
        "eVer.tempEmail": email,
        "eVer.isVer": false,
      }); //TODO: use aggregate pipeline here

      try {
        if (!user) {
          return reject(
            createError.BadRequest({
              code: "UNF_00",
            })
          );
        } else {
          if (user.eVer.isVer) {
            return reject(
              createError.BadRequest({
                code: "AAV_00",
              })
            );
          } else if (user.eVer.eTime <= Date.now()) {
            return reject(
              createError.BadRequest({
                code: "OTP_01",
              })
            );
          } else if (user.eVer.otp != otp) {
            return reject(
              createError.BadRequest({
                code: "OTP_02",
              })
            );
          } else if (user.eVer.otp === otp) {
            const { firstName, lastName, email, username } = validatedResult;

            const reg = {
              $set: {
                "data.un": username,
                "data.pEmail": email,
                "data.name": { fn: firstName, ln: lastName },
                eVer: { isVer: true },
              },
              $addToSet: {
                emails: { email: email },
              },
            };
            const filter = { _id: user._id };
            const result = await UserSchema.updateOne(filter, reg, {
              upsert: false,
            });

            if (result.nModified) {
              return resolve(true);
            } else {
              return reject(createError.InternalServerError());
            }
          }
        }
      } catch (error) {
        if (
          error.name === "MongoError" &&
          error.code === 11000 &&
          Object.keys(error.keyPattern)[0] === "data.un"
        ) {
          return reject(createError.Conflict({ code: "UAT_00" }));
        } else {
          return reject(createError.InternalServerError());
        }
      }
    });
  },
};

// Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
// } catch (err) {
//   await session.abortTransaction();

// if (err.code == 11000) {
//   return reject(createError.BadRequest({ code: "UAT_00" }));
//   } else {
//     return reject(createError.InternalServerError());
//   }
// } finally {
//   session.endSession();
// }
