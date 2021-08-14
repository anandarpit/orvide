const StructureSchema = require("../model/structure");
const UserSchema = require("../model/users")
const createError = require(`http-errors`);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  createStruc: async (validatedResult, userId, roleData) => {
    if((!roleData) && ((roleData.aRoles && roleData.aRoles.ini) || (roleData.role && roleData.role.isInitiator))){
     await createStructure(validatedResult, userId)
     return true;
    } else{
      throw createError.BadRequest({ code: "NA_00" });
    }
  }
};

async function createStructure (validatedResult, userId) {
  const { org_id, name, description, unionRoom } = validatedResult;
  const sData = new StructureSchema({
    org_id: org_id,
    name: name,
    description: {
      value: description,
      editedBy: userId,
    },
    sMeta: {
      initiator: userId,
      creationTime: Date.now(),
    },
    unionRoom: {
      enabled: unionRoom,
    },
    admins: [{ uid: userId, canCreate: true }],
  });
  const nameTaken = await StructureSchema.findOne({org_id: org_id, name: name})
  if(nameTaken){
    throw createError.NotAcceptable({code: "NAT_01"})
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sResult = await sData.save({ session }); //structure create

    const uData = {
      $addToSet: {"JO.$.JS": [{"sId": sResult._id}]}
    }
    const uFilter = {"JO.oId": ObjectId(org_id)}

    await UserSchema.updateOne(uFilter, uData);
    await session.commitTransaction();
    return true;
  } catch (err) {
    await session.abortTransaction();
    if (err.code == 11000) {
      throw createError.BadRequest({ code: "NAT_01" })
    } else {
      console.log(err)
      throw createError.InternalServerError()
    }
  } finally {
    session.endSession();
  }
}