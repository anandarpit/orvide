const Joi = require(`@hapi/joi`)

module.exports = {
    registerSchema: ()=> {
        return Joi.object({
            firstName: Joi.string(),
            lastName:Joi.string(),
            password: Joi.string().min(6).required().messages({
                "string.base": `Should be a type of 'text'`,
                "string.empty": `Cannot be an empty field`,
                "string.min": `Should have a minimum length of {#limit}`,
                "any.required": `Password is Required!`
              }), 
            cnfPass: Joi.ref(`password`), //TODO display messages
            email: Joi.string().email().lowercase().required().messages({
                "string.email": `Invalid Email`,
                "string.empty": `Email cannot be empty`,
                "any.required": `Email is required`
            }),
        })
    },
    loginSchema: ()=> {
        return Joi.object({
            username: Joi.string().required().messages({
                "string.base": `Should be a type of 'text'`,
                "string.empty": `Cannot be an empty field`,
                "any.required": `Username is Required!`
              }),
            password: Joi.string().required().messages({
                "any.required": `Password is Required!`
              }), 
        })
    }
}

//TODO Add username
//TODO add a stronger regEx validation in password