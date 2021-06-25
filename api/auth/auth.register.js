const createError = require(`http-errors`);
const router = require("express").Router();
const { registerSchema } = require('../../validation/validation.auth')
const { RegisterUser1, RegisterUser2 } = require('../../controller/controller.auth')


router.post('/', async (req, res, next) => {
  try {
    const validatedResult = await registerSchema().validateAsync(req.body)

    const result1 = await RegisterUser1(validatedResult.email, validatedResult.otp)
    if (result1) {
      const result2 = await RegisterUser2(validatedResult, result1)
      if (result2) {
        res.send("Registered Successfully!")
      }
    }
    res.end()
  } catch (error) {
    //Checking for Validation Error
    if (error.name = `ValidationError` && error.isJoi) {
      res.status(400).send(error.message) //TODO add custom message instead of error.message
    }
    else if (error.name = `MongoError` && error.code === 11000) {
      res.status(400).send(error) 
    }
    else if (error.code = 01) {
      res.status(401).send(error.message.value)
    }
    else {
      res.status(500).send(error)
    }
  }
})

router.get(`/`, async (req, res, next) => {
  //TODO render the static front end page
})

module.exports = router;