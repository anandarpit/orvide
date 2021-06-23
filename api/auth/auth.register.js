const createError = require(`http-errors`);
const router = require("express").Router();
const {registerSchema} = require('../../validation/validation.auth')
const {RegisterUser} = require('../../controller/controller.auth')


router.post('/', async (req, res, next) => {
  try {
    const validatedResult = await registerSchema().validateAsync(req.body)

    await RegisterUser(validatedResult, res).then((doc) => {
      res.status(200).send({
        message: "Successfully Registered!",
        id: doc._id
      })
    })
    res.end()
  } catch (error) {
    //Checking for Validation Error
    if(error.name = `ValidationError`){
      res.status(400).send(createError(error.message)) //TODO add custom message instead of error.message
    }else{
      res.status(500).send(createError(`Internal Server Error :(`))
    }
  }
})

router.get(`/`, async (req, res, next) => {
  //TODO render the static front end page
})

module.exports = router;  