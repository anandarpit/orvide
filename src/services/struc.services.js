const StructureSchema = require("../model/structure");
const RoomSchema = require("../model/rooms");
const UserSchema = require("../model/users");
const createError = require(`http-errors`);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  createStruc: async (validatedResult, userId, roleData) => {
    // console.log(roleData[0])
    // if (
    //   roleData[0] &&
    //   ((roleData[0].aRoles && roleData[0].aRoles.ini) ||
    //     (roleData[0].role && roleData[0].role.isInitiator))
    // ) {
      await createStructure(validatedResult, userId);
      return true;
    // } else {
    //   throw createError.BadRequest({ code: "NA_00" });
    // }
  },
};

async function createStructure(validatedResult, userId) {
  const { org_id, name, description, unionRoom } = validatedResult;
  const sVal = new StructureSchema({
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
  const nameTaken = await StructureSchema.findOne({
    org_id: org_id,
    name: name,
  });
  if (nameTaken) {
    throw createError.NotAcceptable({ code: "NAT_01" });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //Creating Structure
    const sResult = await sVal.save({ session });

    //Updating User document
    var uVal = null;
    const uFilter = { "JO.oId": ObjectId(org_id) };
    if (unionRoom) {
      //Adding default room if unionRoom == true
      const rVal = new RoomSchema({
        sid: sResult._id,
        name: "all",
        desc: "The Union room for " + name,
        type: "UNION",
        cT: Date.now(),
        rAdm: [{ uid: userId, aTime: Date.now() }],
      });
      const rData = await rVal.save({ session });

      uVal = {
        $addToSet: {
          "JO.$.JS": [{ sId: sResult._id, rooms: [{ rId: rData._id }] }],
        },
      };
    } else {
      uVal = {
        $addToSet: { "JO.$.JS": [{ sId: sResult._id }] },
      };
    }
    const uData = await UserSchema.updateOne(uFilter, uVal, { session });

    await session.commitTransaction();
    return true;
  } catch (err) {
    await session.abortTransaction();
    if (err.code == 11000) {
      throw createError.BadRequest({ code: "NAT_01" });
    } else {
      console.log(err);
      throw createError.InternalServerError();
    }
  } finally {
    session.endSession();
  }
}