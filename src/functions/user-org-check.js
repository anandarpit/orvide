const UserSchema = require(`../model/user/User.js`)
var ObjectId = require('mongoose').Types.ObjectId; 

exports.userBelongsToOrg_uo00 =  async (userId, orgId)=> {
    return await UserSchema.findOne({
        "_id": ObjectId(userId), "joinedOrgs.orgId": ObjectId(orgId)
      });
}