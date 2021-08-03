const mongoose = require("mongoose");

const structureSchema = new mongoose.Schema({
    org_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        editedBY: mongoose.Schema.Types.ObjectId,
    },
    admins : [{
        uid: mongoose.Schema.Types.ObjectId,
        canCreate: Boolean,
    }],
    initiator : {
        uid: mongoose.Schema.Types.ObjectId,
        atTime: Number,
    },
    endorser : {
        uid: mongoose.Schema.Types.ObjectId,
        atTime: Number,
    },
    // rooms : [{
    //     roomId: mongoose.Schema.Types.ObjectId,
    //     roomName: String,
    //     creatorId: String,
    // }],
    unionRoom: {
        enabled: Boolean,
    },
    membersCount: mongoose.Schema.Types.Number, 
}, { timestamps: true })


module.exports = mongoose.model('Structures', structureSchema);