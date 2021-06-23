const createError = require(`http-errors`);
const router = require("express").Router();
const { verifyEmail } = require("../../validation/validation.auth")
const { RegisterEmail } = require('../../controller/controller.auth')


router.post('/', async (req, res, next) => {
    try {
        const validatedResult = await verifyEmail().validateAsync(req.body)

        await RegisterEmail(validatedResult).then((result) => {
            res.set(200).send("Verification Mail sent!")
        }).catch((err) => {
            if (err.name = `MongoError` && err.code === 11000) {
                if (Object.keys(err.keyPattern)[0] === "email") {
                    return res.send(`A user already exists with the same Email. Please login instead!`)
                }
                else{
                    return res.send(err)
                }
            }
        })
        res.end()
    } catch (error) {
        //Checking for Validation Error
        if (error) {
            if (error.name = `ValidationError`) {
                res.status(400).send(createError(error.message)) 
            } else {
                res.status(500).send(createError(`Internal Server Error :(`))
            }
        }
    }
})

module.exports = router;