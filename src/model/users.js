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
      { _id:false,
        oId: mongoose.Schema.Types.ObjectId,
         //orgs unique Id
        roleId: mongoose.Schema.Types.ObjectId,
        label: {
          type: {
            type: String,
            enum: ["ADMIN", "OWNER", "NONE"],
            default: "NONE",
          },
          gBy: {
            type: mongoose.Schema.Types.ObjectId,
            aT: mongoose.Schema.Types.Date,
          },
        },
        ADMIN: {
          //can create new roles
          cnr: {
            is: {
              type: mongoose.Schema.Types.Boolean,
              default: true,
            },
            gBy: mongoose.Schema.Types.ObjectId,
          },
          //can make other admins 
          cma: {
            is: {
              type: mongoose.Schema.Types.Boolean,
              default: true,
            },
            gBy: mongoose.Schema.Types.ObjectId,
          }
        },

        //**From here is the Additional Access
        
        MOD: {
          is: mongoose.Schema.Types.Boolean,
          //can remove user
          cru: {
            is: {
              type: mongoose.Schema.Types.Boolean,
              default: false,
            },
            gBy: mongoose.Schema.Types.ObjectId,
          },
          gBy: mongoose.Schema.Types.ObjectId,
        },
        //can request for new structures
        crs: {
          is: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
          },
          gBy: mongoose.Schema.Types.ObjectId,
        },
        cb: {
          is: {
            type: mongoose.Schema.Types.Boolean,
            default: true,
          },
          gBy: mongoose.Schema.Types.ObjectId,
        },
        cec: {
          is: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
          },
          gBy: mongoose.Schema.Types.ObjectId,
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
