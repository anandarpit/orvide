const mongoose = require(`mongoose`);
const createError = require(`http-errors`);
const router = require("express").Router();
const {signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken} = require(`../jwt/tokens`);

router.get(`/register`, async (req, res, next) => {
  // await signAccessToken(`fgh`);
  res.status(200).json({ success: true, msg: "Register Route" });
});

router.get('/fucku', (req, res) => {
    console.log("arpitanand")
    res.send("s;odf");u
})



module.exports = router;
module.exports = router;
