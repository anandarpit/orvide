const connect = require("../helpers/connection");
const UserSchema = require("../model/User");
const passwordGen = require("../passwordHash");
const createError = require(`http-errors`);

module.exports = {
  RegisterUser: (data, res) => {
    return new Promise((resolve, reject) => {
      try {
        const { firstName, lastName, email, password } = data;
        const passwordData = passwordGen.genPassword(password);
        const hash = passwordData.hash;
        const salt = passwordData.salt;

        //TODO remove username=email
        connect.then((db) => {
          const saveDetails = new UserSchema({
            username: email,
            name: { firstName, lastName },
            email: email,
            password: { salt, hash },
          });

          //TODO handle errors here more gracefully
          saveDetails.save(function (err, doc) {
            if (err) {
              if ((err.name = `MongoError` && err.code === 11000)) {
                //error.code = 11000 means duplicate user found!
                res
                  .status(409)
                  .send(createError.BadRequest("User Already Exists"));
                return reject();
              } else {
                res.send(createError(err.message)); //TODO unchecked error response
                return reject();
              }
            }
            console.log(doc);
            return resolve(doc);
          });
        });
      } catch (error) {
        console.log(error.messages);
        res.send(
          createError.InternalServerError(
            "An internal server error occurred :("
          )
        );
      }
    });
  },

  LoginUser: (validatedResult, res) => {
    return new Promise((resolve, reject) => {
      try {
        const email = validatedResult.username;
        const password = validatedResult.password;

        console.log("Inside LoginUser");
        connect.then((db) => {
          console.log("connected");
          UserSchema.findOne({ email })
            .then((user) => {
              if (!user) {
                console.log("invalid email");
                res.status(404).send(createError("No user found with that email"));
                return reject();
              }
              console.log("found user");
              const hash = user.password.hash;
              const salt = user.password.salt;
              if (!passwordGen.validPassword(password, hash, salt)) {
                console.log("incorrect password");
                res.send(403).send(createError("Incorrect Credentials"));
                return reject();
              }
              console.log("logged info correct");
              return resolve(user._id);
            })
        });
      } catch (error) {
        res.status(500).send(createError.InternalServerError("Internal Server Error"))
        return reject();
      }
    });
  },
};
