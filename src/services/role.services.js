const UserSchema = require("../model/users");
const createError = require(`http-errors`);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    makeAdminService: async (validatedInput)=>{
        //Make ADMIN write to the user Schema
        const userId = validatedInput.userId;
        const cnr = validatedInput.cnr;
        const cma = validatedInput.cma;

        const updateData = {
            //To be updated data
        }
    }
}