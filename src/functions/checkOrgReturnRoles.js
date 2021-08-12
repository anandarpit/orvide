const UserSchema = require(`../model/users`);
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.checkOrReturnRoles_corr00 = async (userId, orgId) => {
  return await UserSchema.aggregate()
    .match({
      _id: ObjectId(userId),
    })
    .project({
      org_doc: {
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
    .lookup({
      from: "roles",
      localField: "org_doc.roleId",
      foreignField: "_id",
      as: "result",
    })
    .project({
      orgId: "$org_doc.orgId",
      aRoles: "$org_doc.aRoles",
      roles: { $arrayElemAt: ["$result", 0] },
    }).exec();
};

/**
 * TEMPLATE OF THE OUTPUT
{
    "_id" : ObjectId("610a3aa1f8928747274665be"), 
    "orgId" : ObjectId("610a73b9f4b8b317393cd883"), 
    "aRoles" : {
        "isEndorser" : {
            "givenBy" : ObjectId("610cd27cd43117df266ceed4")
        }, 
        "isInitiator" : {
            "givenBy" : ObjectId("610cd34fd43117df266ceed5")
        }
    }, 
    "role" : {
        "_id" : ObjectId("610a7060f4b8b317393cd874"), 
        "isEndorser" : false, 
        "isInitiator" : false, 
        "isModerator" : true, 
        "isRoleCreator" : true, 
        "name" : "teacher"
    }
}
 */
