const createError = require(`http-errors`);
const {
  uniqueEmail_serv_ue00,
  uniqueUsername_serv_uu00,
} = require("../services/meta.services");
const {
  uniqueUsername_joi_uu00,
  uniqueEmail_joi_ue00,
} = require("../validation/meta.validation");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  UniqueEmail_ue00: catchAsync(async (req, res, next) => {
    const validatedResult = await uniqueEmail_joi_ue00().validateAsync(
      req.body
    );
    const uniqueEmail = await uniqueEmail_serv_ue00(validatedResult.email);
    if (uniqueEmail) res.status(200).send(uniqueEmail);
    res.end();
  }),

  UniqueUsername_uu00: catchAsync(async (req, res, next) => {
    const validatedResult = await uniqueUsername_joi_uu00().validateAsync(
      req.body,
      { abortEarly: false }
    );
    const result = await uniqueUsername_serv_uu00(validatedResult.uname);
    if (result) return res.status(200).send(result);
    res.end();
  }),
};
