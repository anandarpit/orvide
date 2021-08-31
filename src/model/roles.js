const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    lowercase: true,
    required: true,
  },
  oId: mongoose.Schema.Types.ObjectId,
  meta: {
    cId: mongoose.Schema.Types.ObjectId, //Creator ID(USer's)
    mId: mongoose.Schema.Types.ObjectId, //Modifier's Id (for modifier's time see timestamp)
    cT: mongoose.Schema.Types.Date, // created AT time
  },
  //moderator
  MOD: {
    is: mongoose.Schema.Types.Boolean,
    //can remove user
    cru: {
      type: mongoose.Schema.Types.Boolean,
      default: false
    },
  },
  //can request for new structures
  crs: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  //can blog
  cb: {
    type: mongoose.Schema.Types.Boolean,
    default: true
  },
  //can control events and calendar section
  cec: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  }
},{ timestamps: true });

module.exports = mongoose.model("Roles", RoleSchema);