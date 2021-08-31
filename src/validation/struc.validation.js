const Joi = require(`@hapi/joi`);

module.exports = {
  createStructure: () => {
    return Joi.object({
      //This is the regex to verify if the ObjectId passed is really a 24digit hexadecimal string
      org_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).max(30).required().messages({
        "string.base": `Should be a type of 'text'`,
        "string.pattern.base": "Invalid ObjectId",
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
      unionRoom: Joi.boolean().messages({
          "boolean.base": "Only Boolean values allowed"
      }),
    });
  },
};
