const Joi = require(`@hapi/joi`);

module.exports = {
  validate_org_joi: () => {
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

  validate_orgName_joi:()=>{
    return Joi.object({
      orgName: Joi.string().required().messages({
        "string.empty": `Organisation name cannot be empty`,
        "any.required": `Organsisation Name is required`,
      }),

    });
  },

  validate_orgId_joi:()=>{
    return Joi.object({
      orgId: Joi.string().lowercase().required().messages({
            "string.empty": `OrgID cannot be empty`,
            "any.required": `OrgID is required`,
          }),
    })
  }
}