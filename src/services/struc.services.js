const StructureSchema = require("../model/structure");
const createError = require(`http-errors`);
const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  createStructure: async (validatedResult, userId) => {
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
      const result = await sData.save({ session });
      await session.commitTransaction();
      return true;
    } catch (err) {
      await session.abortTransaction();
      if (err.code == 11000) {
        throw createError.BadRequest({ code: "NAT_01" })
      } else {
        throw createError.InternalServerError()
      }
    } finally {
      session.endSession();
    }
  },
};
