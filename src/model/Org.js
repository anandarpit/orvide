const mongoose =require('mongoose');

const OrgSchema = new mongoose.Schema({
    orgName : {
        type: mongoose.Schema.Types.String,
        required: true
    }
})