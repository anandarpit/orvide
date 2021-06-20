const createError = require(`http-errors`);
const router = require("express").Router();
const { signAccessToken, isAlreadyLoggedIn } = require(`../../jwt/tokens`);
const { LoginUser } = require("../../controller/auth.controller");
const { loginSchema } = require('../../helpers/validation')


router.post('/', async (req, res, next) => {
    try {
        const validatedResult = await loginSchema().validateAsync(req.body)

        await LoginUser(validatedResult, res).then((userId) => {
            if (userId) {
                console.log("user verified");
                signAccessToken(userId).then((token, time) => {

                    //TODO 1. add `secure`  2. find whether to extract token from header or from cookies in token.js
                    res.cookie('authorization', token, { maxAge: 60000, httpOnly: true }); // 60 seconds max age
                    res.status(200).send(`Successfully logged in`)
                })
            }
        })
    } catch (error) {
        //Checking for Validation Error
        if (error.name = `ValidationError`) {
            res.status(400).send(createError(error.message))
        } else {
            res.status(500).send(createError(`Internal Server Error :(`))
        }
    }
})

router.get('/', isAlreadyLoggedIn, (req, res, next) => {
    res.send("Hello from the other side")
})

module.exports = router