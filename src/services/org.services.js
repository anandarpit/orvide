// const connect = require("../helpers/connection");
// const OrgSchema = require("../model/Org");
// const UserSchema = require("../model/user/User");
// const mongoose = require("mongoose");
// const createError = require(`http-errors`);
// const {randomValueHex} = require('../utils/generateId')

// module.exports = {
//   CreateOrg_srv: async (validatedResult, userData) => {
//     return new Promise((resolve, reject) => {
//       try {
//         connect.then(async (db) => {
//           const enable = null;
//           if (validatedResult.orgDomain) enable = true;

//           const data = new OrgSchema({
//             orgId: validatedResult.orgId,
//             orgName: validatedResult.orgName,
//             orgDomain: { enabled: enable, domain: validatedResult.orgDomain },
//           });

//           await data.save((err, doc) => {
//             if (err) return reject(err);
//             else{

//               const filter = { _id: userData._id}
//               const userUpdate = new UserSchema({
//                 _id: userData._id,
//                 emails: [{ email: email }],
//                 username: username,
//                 name: { firstName, lastName },
//               });
//             }
//           });
//         });
//       } catch (error) {
//         return reject(error);
//       }
//     });
//   },
// }

const mongoose = require('mongoose')
const connect = require('../config/connection')
const OrgSchema = require('../model/Org')
const UserSchema = require('../model/users')
const createError = require(`http-errors`)
const { randomValueHex } = require('../utils/generateValue')
const { MyProfile } = require('./fetch.services')

exports.CreateOrg = async (userDetails, body) => {
  return new Promise(async(resolve, reject) => {
    try {
      connect
        .then(async db => {
          const OrgDetails = new OrgSchema({
            orgName: body.orgName,
            orgId: body.orgId,
            architect: {
              id: userDetails.id,
              firstName: userDetails.name.firstName,
              lastName: userDetails.name.lastName,
              username: userDetails.username
            }
          })
          
          await OrgDetails.save((err, doc) => {
            if (err) return reject(createError(500,{message:"Error occurred while saving"}))
            return resolve(true)
          })
        })
    }
    catch(err) {
             if(err) return reject(createError(500,{message:"Internal Server Error"}))
    }
        
   
  })
}


