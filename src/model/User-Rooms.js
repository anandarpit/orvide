const mongoose = require('mongoose');


//NOTE: The filter that would be needed to applied over here would be :  { sID: structureID, uID: UserID } in order to search for the rooms that a user is into in a given structure.
const UserRoomsSchema = new mongoose.Schema({
    org_id: {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    sID: {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    uID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rooms: [{
        type: mongoose.Schema.Types.ObjectId,
        _id :false,
    }]


}, { timestamps: true })


module.exports = mongoose.model('UserRooms', UserRoomsSchema);