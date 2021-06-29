const createError = require(`http-errors`);
const router = require("express").Router();
const { signAccessToken, isAlreadyLoggedIn } = require(`../../jwt/tokens`);
const { LoginUser } = require("../../controller/controller.auth");
const { loginSchema } = require("../../validation/validation.auth");

router.post("/", async (req, res) => {
  try {
    const validatedResult = await loginSchema().validateAsync(req.body);
    const userId = await LoginUser(
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
      return res.status(400).send(createError(error.message));
    if (error.code = `ISE`) return res.send(error.message);
    if (error.code = `LU`) return res.send(error.message);
    return res.status(500).send(`Internal server error`);
  }
});

module.exports = router;