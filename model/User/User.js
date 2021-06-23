const mongoose =require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        unique: true,
        required: false,
        lowercase: true,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        lowercase: true,
        required: false,
        trim: true
    },
    hasCompletedRegistration: {
        type: mongoose.Schema.Types.Boolean,
        required: false
    },
    name: {
        firstName: {
            type : mongoose.Schema.Types.String,
            required: false,
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


const user = mongoose.model('Users', UserSchema);
module.exports = user;
