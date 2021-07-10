const Joi = require(`@hapi/joi`)

module.exports = {
    uniqueUsername_joi_uu00: () => {
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
    uniqueEmail_joi_ue00: () => {
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