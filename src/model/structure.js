const mongoose = require("mongoose");

const structureSchema = new mongoose.Schema({
    oid: {
        type: String,
        required: true
    },
    structureName : {
        type: String,
        required: true,
    },
    admins : [{
        uid: mongoose.Schema.Types.ObjectId,
        canCreate: Boolean,
    }],
    initiator : {
        uid: mongoose.Schema.Types.ObjectId,
        atTime: Number,
    },
    rooms : [{
        roomId: mongoose.Schema.Types.ObjectId,
        roomName: String,
        creatorId: String,
    }],
    unionRoom: {
        enabled: Boolean,
    },
    members: [{
        uid : String,
    }], 
}, { timestamps: true })


module.exports = mongoose.model('Structures', structureSchema);