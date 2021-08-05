const createError = require(`http-errors`);
const { fetchService } = require("../services");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  myProfile_ctrl_mp00: catchAsync(async (req, res, next) => {

    const userData = await fetchService.myProfile(res.locals.payload.sub);

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
