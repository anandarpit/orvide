const mongoose = require('mongoose')
const connect = require('../config/connection')
const orgSchema = require('../model/Org')
const userSchema = require('../model/users')
const createError = require(`http-errors`)
const { randomId } = require('../utils/generateValue')
const logger = require('../config/logger')
const {orgFunc} = require('../functions')
const { debug } = require('../config/logger')

exports.createOrg = (_id, validatedResult) => {
  return new Promise(async (resolve, reject) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const enable = null;
      if (validatedResult.orgDomain) enable = true;
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
        { $addToSet: { "JO.oId": orgDoc._id } }, //addToSet INSTEAD OF PUSH
        { session }
      )
      logger.debug("user collection updated")
      await session.commitTransaction()

      return resolve(true)
    } catch (err) {
      await session.abortTransaction();
      if (err.code === 11000) return reject (createError.BadRequest({ code: "DKE_CO" }));
      logger.error("create Org error ", err);
      return reject(err);
    } finally {
      session.endSession();

    }
  })
}
exports.getUserOrgDetail = async (_id) => {
  const list = await orgFunc.orgIdName(_id);
  logger.debug('org Id and Name  ', list)
  return list;
}

// exports.getStructDetails = async (_id) => {
//   const list = await orgFunc.structIdName(_id, req.orgId);
//   logger.debug("struct Id and Name ", list);
//   return list;

// }



exports.updateInviteLinkStatus = async (_id, validatedResult) => {
  try {
    const { orgId, status } = validatedResult;
    const isCreator = await orgSchema.findOne({ architectId: _id }, { link: { sta: 1 }, _id: 0 });
    if (!isCreator)
      throw createError({ code: "NA_00" });
    
    logger.debug("Status orgId" , status, orgId);
    
    await orgSchema.updateOne({ orgId }, { $set: { "link.sta": status }  });
    return true;
  } catch(err) {
    debug.err("error in invite link", err);
      
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
