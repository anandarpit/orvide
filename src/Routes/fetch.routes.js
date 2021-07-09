const createError = require(`http-errors`);
const router = require("express").Router();
const { MyProfile } = require("../controller/fetch.controller");
const {isLoggedIn} = require("../middleware/auth.middleware")

router.get("/", isLoggedIn, MyProfile);

module.exports = router;
