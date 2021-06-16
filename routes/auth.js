const mongoose = require(`mongoose`);
const createError = require(`http-errors`);
const router = require("express").Router();
const {signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken} = require(`../jwt/tokens`);

router.get(`/register`, async (req, res, next) => {
  res.status(200).json({ success: true, msg: "Register Route" });
});

router.get('/login', (req, res) => {
    console.log("arpitanand")
    res.send("sdf");
})

module.exports = router;
