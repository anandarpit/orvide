const createError = require(`http-errors`);
const { MyProfile } = require("../services/fetch.services");

module.exports = {
  PersonalProfile: async(req, res, next) => {
    try {
      if (res.locals.authenticated && res.locals.tokenPayload) {
        const userData = await MyProfile(res.locals.tokenPayload.sub);

        const response = {
          _id: userData._id,
          username: userData.username,
          firstName: userData.name.firstName,
          lastName: userData.name.lastName,
          emails: userData.emails,
        };
        res.send(response);
      }
    } catch (error) {
      return res.send(error);
    }
  }
};

