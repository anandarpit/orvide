const connect = require("../helpers/connection");
const UserSchema = require("../model/user/User");
const createError = require(`http-errors`);


module.exports = {
    unameUsername: (uname) => {
        return new Promise((resolve, reject) => {
            try {
                connect.then(async (db) => {
                    const user = await UserSchema.findOne({ username: uname })
                    if(!user) {
                        return resolve("unique")
                    }
                    else return resolve("same")
                })
            } catch (error) {
                return reject(createError(500, {code: "UU1", message: "Some error occurred"}))
            }
        })
    }
}