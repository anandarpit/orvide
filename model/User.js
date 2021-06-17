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
    password: {
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
        lastName: {
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

//will run on every save request while in register route
// UserSchema.pre('save', async function (next) {
//     try {
//       if (this.isNew) {
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(this.password, salt)
//         this.password = hashedPassword
//       }
//       next()
//     } catch (error) {
//       next(error)
//     }
//   })

// //Will be used during login; to check if the password is correct
// UserSchema.methods.isValidPassword = async function(pass){
//     return bcrypt.compare(pass, this.password)
// }

const user = mongoose.model('User', UserSchema);
module.exports = user;
