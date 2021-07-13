const createError = require(`http-errors`);
const { uniqueEmail_serv_ue00, uniqueUsername_serv_uu00 } = require("../services/meta.services");
const { uniqueUsername_joi_uu00, uniqueEmail_joi_ue00 } = require("../validation/meta.validation");

module.exports = {
  UniqueEmail_ue00: async (req, res, next) => {
    try {
      // const validatedResult = await uniqueEmail_joi_ue00().validateAsync(
      //   req.body
      // );
      const uniqueEmail = await uniqueEmail_serv_ue00(req.body.email);
      res.status(200).send(uniqueEmail);
    } catch (err) {
      console.log(err); //todo
    }
  },

  UniqueUsername_uu00: async (req, res, next) => {
    try {
      const validatedResult = await uniqueUsername_joi_uu00().validateAsync(
        req.body
      );
      const result = await uniqueUsername_serv_uu00(validatedResult.uname);
      if (result) {
        return res.status(200).send(result);
      } else return res.end();
    } catch (error) {
      if ((error.code = `UU1`)) return res.send(error.message);
      return res.set(500).send("Internal Server Error");
    }
  },
};
