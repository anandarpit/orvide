const createError = require(`http-errors`);
const { fetchService } = require("../services");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  myProfile_ctrl_mp00: catchAsync(async (req, res, next) => {

    const userData = await fetchService.myProfile(res.locals.payload.sub);

    const response = {
      _id: userData._id,
      username: userData.data.un,
      firstName: userData.data.name.fn,
      lastName: userData.data.name.ln,
      emails: userData.emails,
    };
    return res.status(200).send(response);
  }),
};