const createError = require(`http-errors`);
const { signAccessToken } = require(`../helpers/tokens`);
const {
  loginUser_serv_lu00,
  verificationEmail_serv_ve00,
  registerUser_serv_ru00,
} = require("../services/auth.services");
const {
  loginUser_joi_lu00,
  registerUser_joi_ru00,
  verifyEmail_joi_ve00,
} = require("../validation/auth.validation");

exports.VerificationEmail_ve00 = async (req, res, next) => {
  try {
    const validatedResult = await verifyEmail_joi_ve00().validateAsync(
      req.body
    );
    await verificationEmail_serv_ve00(validatedResult)
      .then((result) => {
        const msg = [`Verification Mail sent at ${req.body.email}`, "success"];
        res.set(200).json(msg);
      })
      .catch((err) => {
        if ((err.name = `MongoError` && err.code === 11000)) {
          if (Object.keys(err.keyPattern)[0] === "email") {
            return res
              .set(200)
              .send(
                `A user already exists with the same Email. Please login instead!`
              );
          }
        } else if ((err.code = "lu00")) {
          return res.set(200).send(err.message.value);
        }
      });
    res.end();
  } catch (error) {
    //Checking for Validation Error
    if (error) {
      if ((error.name = `ValidationError`)) {
        res.status(400).send(createError(error.message));
      } else {
        res.status(500).send(createError(`Internal Server Error :(`));
      }
    }
  }
};

exports.LoginUser_lu00 = async (req, res, next) => {
  try {
    const validatedResult = await loginUser_joi_lu00().validateAsync(req.body);
    const userId = await loginUser_serv_lu00(
      validatedResult.email,
      validatedResult.username,
      validatedResult.password
    );
    if (userId) {
      const token = await signAccessToken(userId);
      if (token) {
        res.cookie("authorization", token, {
          maxAge: 1000 * 60 * 60, // 1 hour max age
          httpOnly: true,
        });
        res.send("Logged in!!");
      }
    }
  } catch (error) {
    //Checking for Validation Error
    if ((error.name = `ValidationError`))
      return res.status(400).send(createError(error.message.value));
    if ((error.code = `ISE`)) return res.send(error.message.value);
    if ((error.code = `lu00`)) return res.send(error.message.value);
    return res.status(500).send(`Internal server error`);
  }
};

exports.RegisterUser_ru00 = async (req, res, next) => {
  try {
    const validatedResult = await registerUser_joi_ru00().validateAsync(
      req.body
    );
    const result = await registerUser_serv_ru00(validatedResult);
    if (result) return res.send("registered");
    res.end();
  } catch (error) {
    if ((error.name = `ValidationError` && error.isJoi)) {
      res.status(400).send(error.message);
    } else if ((error.name = `MongoError` && error.code === 11000)) {
      res.status(400).send(error);
    } else if ((error.code = "ru00")) {
      res.status(401).send(error.message.value);
    } else if(error.code = `ISE`){
      return res.send(error.message.value);
    }else {
      res.status(500).send("Internal Service Error! :( ");
    }
  }
};

