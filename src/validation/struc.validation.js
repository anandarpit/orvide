const Joi = require(`@hapi/joi`);

module.exports = {
  createStructure_joi_cs00: () => {
    return Joi.object({
      org_id: Joi.string().max(30).required().messages({
        "string.base": `Should be a type of 'text'`,
        "string.empty": `Cannot be empty`,
        "any.required": `Org ID is required`,
        "string.max": `Exceeded max no of length`
      }),
      name: Joi.string().max(20).required().messages({
        "string.base": `Should be a type of 'text'`,
        "string.empty": `Name cannot be an empty field`,
        "string.max": `Exceeded max no of length`,
        "any.required": `Name is Required!`,
      }),
      description: Joi.string().max(140).messages({
        "string.base": `Should be a type of text`,
        "string.max": `Exceeded max no of length`,
      }),
      // unionRoom: Joi.Boolean().messages({
      //     "boolean.base": "Only Boolean values allowed"
      // }),
    });
  },
};
