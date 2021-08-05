const mongoose = require("mongoose");

const UserRolesSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  roleId: mongoose.Schema.Types.ObjectId,
  orgId: mongoose.Schema.Types.ObjectId,
  additionPower: {
    isRoleCreator: {
        type: Boolean,
        givenBy: mongoose.Schema.Types.ObjectId,
    },
    isModerator: {
        type: Boolean,
        givenBy: mongoose.Schema.Types.ObjectId,
    },
    isEndorser: {
        type: Boolean,
        givenBy: mongoose.Schema.Types.ObjectId,
    },
    isInitiator: {
        type: Boolean,
        givenBy: mongoose.Schema.Types.ObjectId,
    },
  },
});

module.exports = mongoose.model("UserRolesSchema", UserRolesSchema);
