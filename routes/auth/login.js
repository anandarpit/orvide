const createError = require(`http-errors`);
const router = require("express").Router();
const {signAccessToken ,verifyAccessToken} = require(`../../jwt/tokens`);
const { LoginUser } = require("../../controller/auth.controller");
const {loginSchema} = require('../../helpers/validation')


router.post('/', async(req, res,next) => {
    try {
        const validatedResult = await loginSchema().validateAsync(req.body)
        await LoginUser(email, password, res).then((isValid) => {
            if(isValid){
                console.log("user verified");
                //TODO provide the access token
            }
        })
    }catch (error) {
        
    }
})

module.exports = router