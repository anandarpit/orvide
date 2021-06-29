const Joi = require(`@hapi/joi`)

module.exports = {
    uname_unique: () => {
        return Joi.object({
            uname: Joi.string().min(4).lowercase().required().messages({
                //TODO add appropriate RegEX
                "string.base": `Invalid`,
                "string.empty": `Invalid`,
                "string.min": `Should have a minimum length of {#limit}`,
                "any.required": `Invalid`
            }),
        })
    }
}