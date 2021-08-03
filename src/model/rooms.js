const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    structureId : { 
        type: mongoose.Schema.Types.ObjectId,
    },
    roomName : String,
    // members : [{
    //     uid: mongoose.Schema.Types.ObjectId,
    // }],
    creatorId : mongoose.Schema.Types.ObjectId,
    description: String,
})