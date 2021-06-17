const mongoose = require(`mongoose`);
const createError = require(`http-errors`);
const router = require("express").Router();
const {signAccessToken, verifyAccessToken} = require(`../jwt/tokens`);
const registerSchema = require(`../helpers/validation`)
const User = require(`../model/User`)

router.post(`/register`, async (req, res, next) => {
  //TODO write register logic
  try {
    const validatedResult = await registerSchema().validateAsync(req.body)
    console.log(`hhfhhf`)
    res.send(validatedResult)
  } catch (error) {
  res.send(error)
  }
});

router.get('/login', (req, res) => {
    // res.send("sdf");
  //TODO build login logic
})

module.exports = router;  