const createError = require(`http-errors`);
const express = require("express");
const app = express();
const path = require('path');
const router = require("express").Router();
const { signAccessToken, isAlreadyLoggedIn } = require(`../../jwt/tokens`);
const { LoginUser } = require("../../controller/controller.auth");
const { loginSchema } = require('../../validation/validation.auth')
const staticpath =path.join(__dirname,'../../static');
app.use(express.static(staticpath));


 
router.post('/', async (req, res, next) => {
    console.log("login post");
    try {
        const validatedResult = await loginSchema().validateAsync(req.body)

        const userId = await LoginUser(validatedResult, res)
            if (userId) {
                signAccessToken(userId).then((token, time) => {

                    res.cookie('authorization', token, { maxAge: 1000 * 60 * 60, httpOnly: true }); // 1 hour max age
                    // res.status(200).send(`Successfully logged in`)
                    console.log("cookie set");
                    res.json('hello')
                })
            }
        
    } catch (error) {
        //Checking for Validation Error
        if (error.name = `ValidationError`) {
            res.status(400).send(createError(error.message))
        } else {
            res.status(500).send(createError(`Internal Server Error :(`))
        }
    }
})




module.exports = router