const mongoose =require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
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
            required: true
        },
        lastname: {
            type: mongoose.Schema.Types.String,
            required: false
        }
    },
    joinedOrgs: [{
        orgId : {
            type : mongoose.Schema.Types.ObjectId,
            required: true
        },
        orgName : {
            type : mongoose.Schema.Types.String,
            required: true
        },
        userPermissionsId : {
            type :  mongoose.Schema.Types.Object,
            required: true
        },
        role : {
            type : mongoose.Schema.Types.String,
            required: true
        }
    }]
})

mongoose.model('User', UserSchema);