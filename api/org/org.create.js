const createError = require(`http-errors`);
const router = require("express").Router();
const { isLoggedIn } = require("../../jwt/tokens");
const { UserProfile } = require("../../controller/fetchUserProfile");
const { CreateOrg } = require("../../controller/controller.org")
const { create_new} = require("../../validation/validation.org.js")

router.post("/create_new", isLoggedIn, async (req, res) => {
  try {
    if (res.locals.authenticated && res.locals.tokenPayload) {
      const userData = await UserProfile(res.locals.tokenPayload.sub)
      if(userData){
        const validatedResult = await create_new().validateAsync(req.body)
        const result = await CreateOrg(validatedResult, userData)
      }
    }
  } catch (error) {}
});

module.exports = router;
