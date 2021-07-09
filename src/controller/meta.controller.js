const createError = require(`http-errors`);
const { uniqueEmailService, uniqueUsernameService } = require("../services/meta.services");
const { uniqueUsernameJoi, uniqueEmailJoi } = require("../validation/meta.validation");

module.exports = {
  UniqueEmail: async (req, res, next) => {
    try {
      const validatedResult = await uniqueEmailJoi().validateAsync(
        req.body
      );
      const uniqueEmail = await uniqueEmailService(validatedResult.email);
      res.status(200).send(uniqueEmail);
    } catch (err) {
      console.log(err);
    }
  },

  UniqueUsername: async (req, res, next) => {
    try {
      const validatedResult = await uniqueUsernameJoi().validateAsync(
        req.body
      );
      const result = await uniqueUsernameService(validatedResult.uname);
      if (result) {
        return res.status(200).send(result);
      } else return res.end();
    } catch (error) {
      if ((error.code = `UU1`)) return res.send(error.message);
      return res.set(500).send("Internal Server Error");
    }
  },
};
