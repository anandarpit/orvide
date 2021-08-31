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
    .project({
      "_id": 1,
      "data": {
        "oId": 1,
        "OWNER": 1,
        "ADMIN": 1
      }
    })
    .exec();
};

/**
TEMPLATE OF THE OUTPUT
{
  _id: 6126484a6d2141218db38522,
  data: {
    oId: 61264bd6deedb64a65644496,
    OWNER: true,
    ADMIN: { cnr: true, cma: false }
  }
}
 */

