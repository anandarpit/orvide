const createError = require(`http-errors`);
const router = require("express").Router();
const { isLoggedIn } = require("../../jwt/tokens");
const { MyProfile } = require("../../controller/controller.fetch");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    if (res.locals.authenticated && res.locals.user) {
      const userData = await MyProfile(res.locals.user.sub);

      const response = {
        firstName: userData.name.firstName,
        lastName: userData.name.lastName,
        emails: userData.emails,
        _id: userData._id,
        username: userData.username,
      };
      res.send(response);
    }
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
