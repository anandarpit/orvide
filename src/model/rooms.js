const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  sId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: String,
  desc: String, //Description
  type: {
    type: String,
    enum: ["UNION", "MANUAL"],
    default: "MANUAL",
  },
  cId: mongoose.Schema.Types.ObjectId, //Creator ID(USer's) Note: no cId for type: UNION
  cT: mongoose.Schema.Types.Date, //Creation time
  //Room Admins
  rAdm: [{
      uid: mongoose.Schema.Types.ObjectId, //User ID
      aTime: mongoose.Schema.Types.Date,
  }]
});

module.exports = mongoose.model("Rooms", RoomSchema);
