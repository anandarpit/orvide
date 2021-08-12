const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type:mongoose.Schema.Types.String,
        lowercase: true,
        required: true
    },
    oId: mongoose.Schema.Types.ObjectId,
    meta: {
        cId: mongoose.Schema.Types.ObjectId, //Creator ID(USer's)
        cT: String  // created AT time
    },
    isRC: Boolean,  // is role creator
    isMod: Boolean, // is moderator
    isEnd: Boolean, // is endorser
    isIni: Boolean, //is Initiator
})

module.exports = mongoose.model('Roles', RoleSchema)