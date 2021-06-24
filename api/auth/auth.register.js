const createError = require(`http-errors`);
const router = require("express").Router();
const { registerSchema } = require('../../validation/validation.auth')
const { RegisterUser1, RegisterUser2 } = require('../../controller/controller.auth')


router.post('/', async (req, res, next) => {
  try {

    const validatedResult = await registerSchema().validateAsync(req.body)

    const result1 = await RegisterUser1(validatedResult)
    if (result1) {
      const result2 = await RegisterUser2(validatedResult)
      if (result2) {
        res.send("Registered")
      }
    }
    res.end()
  } catch (error) {
    //Checking for Validation Error
    if (error.name = `ValidationError`) {
      res.status(400).send(error) //TODO add custom message instead of error.message
    } else {
      res.status(500).send(error)
    }
  }
})

router.get(`/`, async (req, res, next) => {
  //TODO render the static front end page
})

module.exports = router;