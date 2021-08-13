const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    uId : { 
        type: mongoose.Schema.Types.Number,
    }
})
const test = mongoose.model("test", testSchema);
module.exports = test;