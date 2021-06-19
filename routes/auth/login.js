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
                    var cookie = req.cookies.auth;
                    if (!cookie) {
                        res.cookie('auth', token, { maxAge: 900000, httpOnly: true });
                    } else {
                        console.log('Cookie Already Set');
                    }
                    // res.setHeader('Authorization', 'Bearer ' + token);
                    res.status(200).send(`Successfully logged in`)
                })
            }
        })
    } catch (error) {
        //Checking for Validation Error
        if (error.name = `ValidationError`) {
            res.status(400).send(createError(error.message)) //TODO add custom message instead of error.message
        } else {
            res.status(500).send(createError(`Internal Server Error :(`))
        }
    }
})

router.get('/', isAlreadyLoggedIn, (req, res, next)=>{
    
})

module.exports = router