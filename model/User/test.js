const mongoose =require('mongoose');


const opts = {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  };

const testSchema = new mongoose.Schema({
    
        email: [{
            name: {
                type: String,
                unique :true,
                required: true
            },
            email: {
                type: String,
                unique: true,
                required: true
            }
        }],
}, {timestamps: true})

const user = mongoose.model('test', testSchema);
module.exports = user;
