const createError = require(`http-errors`);
const router = require("express").Router();
const { isLoggedIn } = require("../../jwt/tokens");
const { UserProfile } = require("../../controller/fetchUserProfile");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    if (res.locals.authenticated && res.locals.tokenPayload) {
      const userData = await UserProfile(res.locals.tokenPayload.sub);

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
});

module.exports = router;
