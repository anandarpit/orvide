const Joi = require(`@hapi/joi`);

module.exports = {
  makeAdmin: () => {
    return Joi.object({
      userId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .max(30)
        .required()
        .messages({
          "string.base": `Should be a type of 'text'`,
          "string.pattern.base": "Invalid ObjectId",
          "string.empty": `Cannot be empty`,
          "any.required": `User Id is required`,
          "string.max": `Exceeded max no of length`,
        }),
      orgId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .max(30)
        .required()
        .messages({
          "string.base": `Should be a type of 'text'`,
          "string.pattern.base": "Invalid ObjectId",
          "string.empty": `Cannot be empty`,
          "any.required": `Org ID is required`,
          "string.max": `Exceeded max no of length`,
        }),
      cnr: Joi.boolean().messages({
        "boolean.empty": `Status can not be empty`,
      }),
      cma: Joi.boolean().messages({
        "boolean.empty": `Status can not be empty`,
      }),
    });
  },
};
