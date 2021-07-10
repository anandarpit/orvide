const createError = require(`http-errors`);
const { MyProfile } = require("../services/fetch.services");

module.exports = {
  PersonalProfile: async(req, res, next) => {
    try {
      if (res.locals.authenticated && res.locals.user) {
        const userData = await MyProfile(res.locals.user.sub);

        const response = {
          _id: userData._id,
          username: userData.username,
          firstName: userData.name.firstName,
          lastName: userData.name.lastName,
          emails: userData.emails,
        };
        return res.send(response);
      }
      res.end()
    } catch (error) {
      return res.send(error);
    }
  }
};

