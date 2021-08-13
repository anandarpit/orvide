const mongoose = require("mongoose");

const testArraySchema = new mongoose.Schema({
    uId : { 
        type: mongoose.Schema.Types.Number,
    },
    orgId:[{ 
            type:mongoose.Schema.Types.Number,
            strucId:[{ 
                type:mongoose.Schema.Types.Number,
                roomId:[{ 
                    type:mongoose.Schema.Types.Number,
                }]
            }]
    }]
    
})
const testArray = mongoose.model("testArray", testArraySchema);
module.exports = testArray;