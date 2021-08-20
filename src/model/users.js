const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    data: {
      //User Name
      un: {
        type: mongoose.Schema.Types.String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
      },
      pEmail: {
        type: mongoose.Schema.Types.String,
        lowercase: true,
        trim: true,
      },
      //Name
      name: {
        //First Name
        fn: {
          type: mongoose.Schema.Types.String,
          trim: true,
        },
        //Last Name
        ln: {
          type: mongoose.Schema.Types.String,
          trim: true,
        },
      },
      password: {
        hash: {
          type: mongoose.Schema.Types.String,
        },
        salt: {
          type: mongoose.Schema.Types.String,
        },
      },
    },
    //Email verification
    eVer: {
      tempEmail: {
        type: mongoose.Schema.Types.String,
        lowercase: true,
        trim: true,
      },
      isVer: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
      },
      otp: {
        type: mongoose.Schema.Types.String,
      },
      eTime: {
        type: mongoose.Schema.Types.Number,
      },
    },
    emails: [
      {
        email: {
          type: mongoose.Schema.Types.String,
          unique: true,
          lowercase: true,
          sparse: true,
          trim: true,
        },
      },
    ],

    //Joined Orgs []Array so capital
    JO: [
      {
        oId: mongoose.Schema.Types.ObjectId, //orgs unique Id
        roleId: mongoose.Schema.Types.ObjectId,
        aRoles: {
          //Additional roles
          rC: {
            // is role creator
            gBy: mongoose.Schema.Types.ObjectId, //Given By
          },
          mod: {
            // is moderator
            gBy: mongoose.Schema.Types.ObjectId, //Given By
          },
          end: {
            // is endorser
            gBy: mongoose.Schema.Types.ObjectId, //Given By
          },
          ini: {
            //is Initiator
            gBy: mongoose.Schema.Types.ObjectId, //Given By
          },
        },
        //Joined structures
        JS: [
          {
            _id: false,
            sId: mongoose.Schema.Types.ObjectId,
            rooms: [
              {
                rId: mongoose.Schema.Types.ObjectId,
                _id: false,
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
