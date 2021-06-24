const mongoose =require('mongoose');

const UserMetaSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true
    },
    username: {
        type: mongoose.Schema.Types.String,
        required: false,
        lowercase: true,
        trim: true
    },
    password: {
        hash: {
            type : mongoose.Schema.Types.String,
        },
        salt: {
            type: mongoose.Schema.Types.String,
        }
    },
    emailVerification: {
        isVerified: {
            type: mongoose.Schema.Types.Boolean,
            required: true
        },
        verificationOtp: {
            type: mongoose.Schema.Types.String
        },
        issuedTime: {
            type: mongoose.Schema.Types.Number
        }
    },
    hasCompletedRegistration: {
        type: mongoose.Schema.Types.Boolean,
        required: false
    }
})


const user = mongoose.model('UserMeta', UserMetaSchema);
module.exports = user;
