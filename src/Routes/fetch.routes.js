const createError = require(`http-errors`);
const router = require("express").Router();
const { PersonalProfile } = require("../controller/fetch.controller");
const {isLoggedIn} = require("../middleware/auth.middleware")

router.get("/my_profile", isLoggedIn, PersonalProfile);

module.exports = router;
