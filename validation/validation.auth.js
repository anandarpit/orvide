const Joi = require(`@hapi/joi`)

module.exports = {
    verifyEmail: () => {
        return Joi.object({
            email: Joi.string().email().lowercase().required().messages({
                "string.email": `Invalid Email`,
                "string.empty": `Email cannot be empty`,
                "any.required": `Email is required`
            }),
            password: Joi.string().min(6).required().messages({
                "string.base": `Should be a type of 'text'`,
                "string.empty": `Cannot be an empty field`,
                "string.min": `Should have a minimum length of {#limit}`,
                "any.required": `Password is Required!`
            }),
            cnfPass: Joi.ref(`password`), //TODO display messages
        })
    },
    registerSchema: () => {
        return Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            username: Joi.string().min(4).lowercase().required().message({
                //TODO add appropriate RegEX
                "string.base": `Should be a type of 'text'`,
                "string.empty": `Cannot be an empty field`,
                "string.min": `Should have a minimum length of {#limit}`,
                "any.required": `Username is Required!`

            }),
            email: Joi.string().email().lowercase().required().messages({
                "string.email": `Invalid Email`,
                "string.empty": `Email cannot be empty`,
                "any.required": `Email is required`
            }),
            otp: Joi.number().integer().positive().required().max(8).messages({
                "any.required": `Email is required`,
                "string.empty": `Email cannot be empty`
            })
        })
    },
    loginSchema: () => {
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