const createError = require(`http-errors`);
const express = require("express");
const app = express();
const path = require('path');
const router = require("express").Router();
const { signAccessToken, isAlreadyLoggedIn } = require(`../../jwt/tokens`);
const { LoginUser } = require("../../controller/auth.controller");
const { loginSchema } = require('../../validation/authValidation')
const staticpath =path.join(__dirname,'../../static');
app.use(express.static(staticpath));
console.log(staticpath);
 
router.post('/', async (req, res, next) => {
    try {
        const validatedResult = await loginSchema().validateAsync(req.body)

        await LoginUser(validatedResult, res).then((userId) => {
            if (userId) {
                signAccessToken(userId).then((token, time) => {

                    res.cookie('authorization', token, { maxAge: 1000 * 60 * 60, httpOnly: true }); // 1 hour max age
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

router.get('/',isAlreadyLoggedIn, (req, res, next) => {
    // res.send(200).send("Please enter your credentials!")
    if(req.loginStatus)
    res.sendFile(staticpath+'/home.html')
    res.sendFile(staticpath+'/login.html')

})

module.exports = router