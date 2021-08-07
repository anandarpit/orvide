const mongoose = require("mongoose");

const StructureSchema = new mongoose.Schema(
  {
    org_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      value: mongoose.Schema.Types.String,
      editedBY: mongoose.Schema.Types.ObjectId,
    },
    admins: [
      {
        _id: false,
        uid: mongoose.Schema.Types.ObjectId,
        canCreate: Boolean,
      },
    ],
    endorser: {
      uid: mongoose.Schema.Types.ObjectId,
      atTime: Number,
    },
    // rooms : [{
    //     roomId: mongoose.Schema.Types.ObjectId,
    //     roomName: String,
    //     creatorId: String,
    // }],
    unionRoom: {
      enabled: Boolean,
    },
    membersCount: mongoose.Schema.Types.Number,
    sMeta: {
      initiator: mongoose.Schema.Types.ObjectId,
      creationTime: mongoose.Schema.Types.Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Structures", StructureSchema);