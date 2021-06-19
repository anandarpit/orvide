const jwt = require(`jsonwebtoken`);
const createError = require(`http-errors`);
const fs = require("fs");
const path = require("path");

//This is temporary until we use Aws KMS to store the private key
const pathToPrivKey = path.join(__dirname, "..", "key/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");
const pathToPubKey = path.join(__dirname, "..", "key/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

function signAccessToken(userId) {
  return new Promise((resolve, reject) => {
    const _id = userId;
    const issuer = `orvide.com`;

    const payload = {
      sub: _id,
      iat: Date.now(),
      iss: issuer,
      type: `at`
    };

    const options = {
      expiresIn: `1h`,
      algorithm: `RS256`,
    };

    jwt.sign(payload, PRIV_KEY, options, (err, token) => {
      if (err) {
        console.log(err.message);
        return reject(createError.InternalServerError());
      }
      return resolve(token)
    });
  });
}

function isAlreadyLoggedIn(req, res, next) {
  try {
    // console.log(req.headers['Cookie'])
    if (!req.headers['Cookie']) {
      next()
      return
    }
    const token = req.headers.cookie.auth
    // const bearerToken = authHeader.split(` `)
    // const token = authH
    jwt.verify(token, PUB_KEY, (err, payload) => {
      if (err) {
        if (err.name == "JsonWebTokenError") {
          next()
        } else {
          res.status(400).send(createError.InternalServerError())
        }
      } else {
        res.redirect("Already Logged In")
      }
    })

    req.payload = payload
    next()
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = { signAccessToken, isAlreadyLoggedIn }

