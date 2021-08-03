const Joi = require(`@hapi/joi`);

module.exports = {
  verifyEmail_joi_ve00: () => {
    return Joi.object({
      email: Joi.string().email().lowercase().required().messages({
        "string.email": `Invalid Email`,
        "string.empty": `Email cannot be empty`,
        "any.required": `Email is required`,
      }),
      password: Joi.string().min(6).required().messages({
        "string.base": `Should be a type of 'text'`,
        "string.empty": `Cannot be an empty field`,
        "string.min": `Should have a minimum length of {#limit}`,
        "any.required": `Password is Required!`,"string.base": `Should be a type of 'text'`,
      }),
      cnfPass: Joi.ref(`password`), //TODO display messages
    });
  },
  registerUser_joi_ru00: () => {
    return Joi.object({
      firstName: Joi.string().required().messages({
        "any.required": `First Name is Required!`,
        "string.base": `First Name should be type of 'text'`,
        "string.empty": `First Name cannot be an empty field`,
      }),
      lastName: Joi.string().messages({
        "string.base": `Last Name should be a type of 'text'`,
      }),
      username: Joi.string().min(4).lowercase().required().messages({
        //TODO add appropriate RegEX
        "string.base": `Should be a type of 'text'`,
        "string.empty": `Cannot be an empty field`,
        "string.min": `Should have a minimum length of {#limit}`,
        "any.required": `Username is Required!`,
      }),
      email: Joi.string().email().lowercase().required().messages({
        "string.email": `Invalid Email`,
        "string.empty": `Email cannot be empty`,
        "any.required": `Email is required`,
      }),
      otp: Joi.string().required().max(8).messages({
        "any.required": `OTP is required`,
        "string.empty": `OTP cannot be empty`,
      }),
    });
  },
  loginUser_joi_lu00: () => {
    return Joi.object()
      .keys({
        username: Joi.string().allow(""),
        email: Joi.string().allow("").when("a", { is: "", then: Joi.string() }),
        password: Joi.string().required().messages({
          "any.required": `Password is Required!`,
        }),
      })
      .or("username", "email");
  },
};

//TODO Add username
//TODO add a stronger regEx validation in password
