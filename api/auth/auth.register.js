const createError = require(`http-errors`);
const router = require("express").Router();
const { registerSchema } = require("../../validation/validation.auth");
const {
  RegisterUser1,
  RegisterUser2,
} = require("../../controller/controller.auth");

router.post("/", async (req, res, next) => {
  try {
    const validatedResult = await registerSchema().validateAsync(req.body);
    const result1 = await RegisterUser1(
      validatedResult.email,
      validatedResult.otp
    );
    if (result1) {
      const result2 = await RegisterUser2(validatedResult, result1);
      if (result2) {
        return res.send("Registered Successfully!");
      }
    }
    res.end();
  } catch (error) {
    if ((error.name = `ValidationError` && error.isJoi)) {
      //Validation Error from Hapi
      res.status(400).send(error.message);
    } else if ((error.name = `MongoError` && error.code === 11000)) {
      //"11000" is the Mongo error code for duplicate errors
      res.status(400).send(error);
    } else if ((error.code = "RU1")) {
      //"RU1" is a custom error code for RegisterUser1
      res.status(401).send(error.message.value);
    } else if ((error.code = "RE")) {
      //"RE" is a custom error code for RegisterEmail
      res.status(401).send(error.message.value);
    } else {
      res.status(500).send("Internal Service Error! :( ");
    }
  }
});

module.exports = router;