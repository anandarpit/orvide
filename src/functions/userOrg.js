const UserSchema = require(`../model/users`)
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.orgIdName =async (userId) => {
  
    var pipeline = [
      {
        $match: {
          "_id":ObjectId(userId)
        }
      },
      {
        $project: {
          "orgId": "$JO.oId",
          "_id": 0.0
        }
      },
      {
        $lookup: {
          "from": "orgs",
          "localField": "orgId",
          "foreignField": "_id",
          "as": "result"
        }
      },
      {
        $project: {
          "result.oId": 1,
          "result.orgName": 1
        }
      }
    ];
        
  return await UserSchema.aggregate(pipeline);

        
}
  
// exports.orgIdName =async (userId, orgId) => {
  
//     var pipeline = [
//       {
//         "$match": {
//           "_id":ObjectId(userId)
//         }
//       },
//       {
//         "$project": {
//           $arrayElemAt: [
//             {
//               $filter: {
//                 input: "$JO",
//                 cond: {
//                   $eq: ["$$this.oId", ObjectId(orgId)],
//                 },
//               },
//             }
//           ]
//         }
//       },
//       {
//         "$lookup": {
//           "from": "structure",
//           "localField": "orgId",
//           "foreignField": "_id",
//           "as": "result"
//         }
//       },
//       {
//         "$project": {
//           "result.oId": 1,
//           "result.orgName": 1
//         }
//       }
//     ];
        
//   return await UserSchema.aggregate(pipeline);

        
//   }