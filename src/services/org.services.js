// const connect = require("../helpers/connection");
// const OrgSchema = require("../model/Org");
// const UserSchema = require("../model/user/User");
// const mongoose = require("mongoose");
// const createError = require(`http-errors`);
// const {randomValueHex} = require('../utils/generateId')

// module.exports = {
//   CreateOrg_srv: async (validatedResult, userData) => {
//     return new Promise((resolve, reject) => {
//       try {
//         connect.then(async (db) => {
// const enable = null;
// if (validatedResult.orgDomain) enable = true;

//           const data = new OrgSchema({
//             orgId: validatedResult.orgId,
//             orgName: validatedResult.orgName,
// orgDomain: { enabled: enable, domain: validatedResult.orgDomain },
//           });

//           await data.save((err, doc) => {
//             if (err) return reject(err);
//             else{

//               const filter = { _id: userData._id}
//               const userUpdate = new UserSchema({
//                 _id: userData._id,
//                 emails: [{ email: email }],
//                 username: username,
//                 name: { firstName, lastName },
//               });
//             }
//           });
//         });
//       } catch (error) {
//         return reject(error);
//       }
//     });
//   },
// }

const mongoose = require('mongoose')
const connect = require('../config/connection')
const orgSchema = require('../model/Org')
const userSchema = require('../model/users')
const createError = require(`http-errors`)
const { randomId } = require('../utils/generateValue')
const logger = require('../config/logger')

exports.createOrg = (_id, validatedResult) => {
  return new Promise(async (resolve, reject) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const enable = null
      if (validatedResult.orgDomain) enable = true

      const linkId = await randomId(26); //gen linkId for org invite link

      const orgDetails = new orgSchema({
        orgName: validatedResult.orgName, 
         oId: validatedResult.orgId,
        orgDomain: { enabled: enable, domain: validatedResult.orgDomain },
        ownerId: {
          _id
        },
        link: {
          id: linkId,
        }
        
        
      })

      
      
      const orgDoc = await orgDetails.save({ session })
      logger.debug("orgDetails inserted");

      await userSchema.updateOne(
        { _id },
        { $push: { joinedOrgs: { orgId: orgDoc._id } } },
        { session }
      )
      logger.debug("user collection updated")
      await session.commitTransaction()

      return resolve(true)
    } catch (err) {
      await session.abortTransaction()
      if (err.code === 11000 && err.name === 'MongoError') return reject(createError(500, { code: "DKE" }))
      return reject(err);
    } finally {
      session.endSession();

    }
  })
}

exports.getOrg = async _id => {
  return new Promise(async (resolve, reject) => {
    const orgList = await UserSRSchema.find({ uID: _id }, { org_id: 1, _id: 0 });
    logger.info('orgList', orgList);
  })
}
exports.saveToUserRS = async (_id, orgId) => {
  return new Promise(async (resolve, reject) => {
    resolve(true);
  })
}
exports.updateInviteLinkStatus = async (_id, validatedResult) => {
  try {
    const { orgId, status } = validatedResult;
    const isCreator = await orgSchema.findOne({ architectId: _id }, { link: {sta:1}, _id: 0 });
    console.log("Status orgId" , status, orgId);
    
    await orgSchema.updateOne({ orgId }, { $set: { "link.sta": status }  });
    return true;
  } catch(err) {
    console.log("updating error " +err);
  }
}

exports.isCreator = async (_id) => {

  const creator = await orgSchema.findOne(
  { ownerId: _id },
  { link: { sta: 1 }, _id: 0 }
  ).catch((err) => {
    console.log("error ",err)
  })
  console.log("creator  err",creator,err);
  if (creator) 
    return true;
  else 
    return false

}
