const Joi = require(`@hapi/joi`);

module.exports = {
  validate_org: () => {
      return Joi.object({
          orgName: Joi.string().required().messages({
            "string.empty": `Org name cannot be empty`,
            "any.required": `Org name is required`,
          }),
          orgId: Joi.string().lowercase().required().messages({
            "string.empty": `OrgID cannot be empty`,
            "any.required": `OrgID is required`,
          }),
          orgDomain: Joi.string().lowercase()
      })
  }, 


}