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
      trim: true,
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
    unionRoom: {
      enabled: Boolean,
    },
    sMeta: {
      initiator: mongoose.Schema.Types.ObjectId,
      creationTime: mongoose.Schema.Types.Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Structures", StructureSchema);