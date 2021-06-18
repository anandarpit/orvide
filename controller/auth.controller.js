const connect = require("../helpers/connection");
const UserSchema = require("../model/User");
const passwordGen = require("../passwordHash");
const createError = require(`http-errors`);

module.exports = {
  RegisterUser: (data) => {
    const { firstName, lastName, email, password, cnfpass } = data;

    const passworData = passwordGen.genPassword(password);
    const hash = passworData.hash;
    const salt = passworData.salt;

    console.log(hash + " " + salt);
    connect.then((db) => {
      const saveDetails = new UserSchema({
        username: email,
        name: { firstName, lastName },
        email,
        password: { salt, hash },
      }); //TODO username=email
      saveDetails.save(function (err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted succussfully!");
      });
    });
  },
  VerifyUser: (email, password) => {
    return new Promise((resolve, reject) => {

    console.log("inside verifyUser");
    connect.then((db) => {
      console.log("connected");
      UserSchema.findOne({ email })
        .then((user) => {
          if (!user) {
            console.log("invalid email");
            return resolve(false)
          }
          console.log("find user");
          const hash = user.password.hash;
          const salt = user.password.salt;
          if (!passwordGen.validPassword(password, hash, salt)) {
            console.log("incorrect password");
            return resolve(false);
          }
          console.log("user exist");
          return resolve(true)
        })
        .catch((err) => {
            reject(createError.InternalServerError("THis server is dammned"))
          console.log("user find error " + err);
        });
    });
  })
}};
