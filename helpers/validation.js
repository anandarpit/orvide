const Joi = require(`@hapi/joi`)

module.exports = 
function registerSchema(){
    return Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).required(), //TODO add a stronger regEx validation
        cpassword: Joi.ref(`password`) 
    })
} 

