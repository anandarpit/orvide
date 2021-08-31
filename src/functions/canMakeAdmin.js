const UserSchema = require(`../model/users`);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.canMakeAdmin_func = async (userId, orgId) => {
  return await UserSchema.aggregate()
    .match({
      _id: ObjectId(userId),
      "JO.oId": ObjectId(orgId),
    })
    .project({
      data: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$JO",
              cond: {
                $eq: ["$$this.oId", ObjectId(orgId)],
              },
            },
          },
          0,
        ],
      },
    })
    .exec();
};

/**
TEMPLATE OF THE OUTPUT
{ 
    "_id" : ObjectId("6126484a6d2141218db38522"), 
    "data" : {
        "oId" : ObjectId("61264bd6deedb64a65644496"), 
        "label" : {
            "type" : "OWNER"
        }
    }
}
 */
