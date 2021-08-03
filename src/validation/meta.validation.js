const Joi = require(`@hapi/joi`)

module.exports = {
    uniqueUsername: () => {
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
    uniqueEmail: () => {
        return Joi.object({
            email: Joi.string().email().required().messages({
                //TODO add appropriate RegEX
                "string.base": `Invalid`,
                "string.empty": `Invalid`,
                "string.min": `Should have a minimum length of {#limit}`,
                "any.required": `Invalid`
            }),
        })
    },
      validate_orgName:()=>{
    return Joi.object({
      orgName: Joi.string().required().messages({
        "string.empty": `Organisation name cannot be empty`,
        "any.required": `Organsisation Name is required`,
      }),

    });
  },

  validate_orgId:()=>{
    return Joi.object({
      orgId: Joi.string().lowercase().required().messages({
            "string.empty": `OrgID cannot be empty`,
            "any.required": `OrgID is required`,
          }),
    })
  }
}