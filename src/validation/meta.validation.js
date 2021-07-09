const Joi = require(`@hapi/joi`)

module.exports = {
    uname_unique: () => {
        return Joi.object({
            username: Joi.string().min(4).lowercase().required().messages({
                //TODO add appropriate RegEX
                "string.base": `Invalid`,
                "string.empty": `Invalid`,
                "string.min": `Should have a minimum length of {#limit}`,
                "any.required": `Invalid`
            }),
        })
    },
    unique_email: () => {
        return Joi.object({
            email: Joi.string().email().required().messages({
                //TODO add appropriate RegEX
                "string.base": `Invalid`,
                "string.empty": `Invalid`,
                "string.min": `Should have a minimum length of {#limit}`,
                "any.required": `Invalid`
            }),
        })
    }
}