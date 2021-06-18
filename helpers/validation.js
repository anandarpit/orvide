const Joi = require(`@hapi/joi`)

module.exports = 
function registerSchema() {
    return Joi.object({
        
        firstName: Joi.string(),
        lastName:Joi.string(),
        password: Joi.string().min(6).required(), //TODO add a stronger regEx validation
        cnfpass: Joi.ref(`password`),
        email: Joi.string().email().lowercase().required(),
        //TODO add username
    })
} 

