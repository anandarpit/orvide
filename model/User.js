const mongoose =require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true
    },
    pass: {
        hash: {
            type : mongoose.Schema.Types.String,
            required: true
        },
        salt: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    },
    name: {
        firstName: {
            type : mongoose.Schema.Types.String,
            required: true,
            trim: true
        },
        lastname: {
            type: mongoose.Schema.Types.String,
            required: false,
            trim: true
        }
    },
    joinedOrgs: [{
        orgId : {
            type : mongoose.Schema.Types.ObjectId,
        },
        orgName : {
            type : mongoose.Schema.Types.String,
        },
        userPermissionsId : {
            type :  mongoose.Schema.Types.Object,
        },
        role : {
            type : mongoose.Schema.Types.String,
        }
    }]
})

UserSchema.pre('save', async function (next) {
    try {
      /* 
      Here first checking if the document is new by using a helper of mongoose .isNew, therefore, this.isNew is true if document is new else false, and we only want to hash the password if its a new document, else  it will again hash the password if you save the document again by making some changes in other fields incase your document contains other fields.
      */
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
      }
      next()
    } catch (error) {
      next(error)
    }
  })

mongoose.model('User', UserSchema);