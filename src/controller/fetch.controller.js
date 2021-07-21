const createError = require(`http-errors`);
const { MyProfile } = require("../services/fetch.services");
const catchAsync = require('../utils/catchAsync')

module.exports = {
  PersonalProfile: catchAsync(async(req, res, next) => {
      if (res.locals.authenticated && res.locals.user) {
        const userData = await MyProfile(res.locals.user.sub);

        const response = {
          _id: userData._id,
          username: userData.username,
          firstName: userData.name.firstName,
          lastName: userData.name.lastName,
          emails: userData.emails,
        };
        return res.status(200).send(response);
      }
      res.end();
  })
};

