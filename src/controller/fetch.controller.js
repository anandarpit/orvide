const createError = require(`http-errors`);
const { myProfile_serv_mp00 } = require("../services/fetch.services");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  myProfile_ctrl_mp00: catchAsync(async (req, res, next) => {
    if (!res.locals.authenticated && !res.locals.user)
      return res.status(404).send("Please Login In");

    const userData = await myProfile_serv_mp00(res.locals.user.sub);

    const response = {
      _id: userData._id,
      username: userData.username,
      firstName: userData.name.firstName,
      lastName: userData.name.lastName,
      emails: userData.emails,
    };
    return res.status(200).send(response);
  }),
};
