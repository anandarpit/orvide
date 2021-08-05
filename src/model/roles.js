const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type:mongoose.Schema.Types.String,
        lowercase: true,
        required: true
    },
    org_id: mongoose.Schema.Types.ObjectId,
    roleMeta: {
        creatorId: mongoose.Schema.Types.ObjectId,
        creationTime: String
    },
    isRoleCreator: Boolean,
    isModerator: Boolean,
    isEndorser: Boolean,
    isInitiator: Boolean,
})

module.exports = mongoose.model('Roles', RoleSchema)