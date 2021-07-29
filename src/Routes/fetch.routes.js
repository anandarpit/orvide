const createError = require(`http-errors`);
const router = require("express").Router();
const { myProfile_ctrl_mp00 } = require("../controller/fetch.controller");
const {isLoggedIn} = require("../middleware/auth.middleware")

router.get("/my_profile", isLoggedIn, myProfile_ctrl_mp00);

module.exports = router;
