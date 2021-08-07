const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
    },
    emails: [
      {
        email: {
          type: mongoose.Schema.Types.String,
          unique: true,
          lowercase: true,
          required: false,
          trim: true,
        },
      },
    ],
    name: {
      firstName: {
        type: mongoose.Schema.Types.String,
        trim: true,
      },
      lastName: {
        type: mongoose.Schema.Types.String,
        trim: true,
      },
    },
    joinedOrgs: [
      {
        orgId: mongoose.Schema.Types.ObjectId,
        roleId: mongoose.Schema.Types.ObjectId,
        aRoles: {
          isRoleCreator: {
            givenBy: mongoose.Schema.Types.ObjectId
          },
          isModerator: {
            givenBy: mongoose.Schema.Types.ObjectId
          },
          isEndorser: {
            givenBy: mongoose.Schema.Types.ObjectId
          },
          isInitiator: {
            givenBy: mongoose.Schema.Types.ObjectId
          },
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
