const jwt = require(`jsonwebtoken`);
const createError = require(`http-errors`);
const fs = require("fs");
const path = require("path");

//This is temporary until we use Aws KMS to store the private key
const pathToPrivKey = path.join(__dirname, "..", "key/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");

const pathToPubKey = path.join(__dirname, "..", "key/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");


function signAccessToken(userid) {
  return new Promise((resolve, reject) => {
    const _id = userid;
    const issuer = `orvide.com`;

    const payload = {
      sub: _id,
      iat: Date.now(),
      iss: issuer,
      type: at
    };

    const options = {
      expiresIn: `1h`,
      algorithm: `RS256`,
    };

    jwt.sign(payload, PRIV_KEY, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      console.log(token);
      resolve(token)
    });
  });
}

function verifyAccessToken(req, res, next) {
  if(!req.headers["authorization"]) return next(createError.Unauthorized(`You are not authorized`))

  const authHeader = req.headers[`authorization`]
  const bearerToken = authHeader.split(` `)
  const token = bearerToken[1]
  jwt.verify(token, PUB_KEY, (err, payload) => {
    if(err) {
      const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
    return next(createError.Unauthorized(message))
    }
  })

  req.payload = payload
  next()
}

function signRefreshToken(userid) {
  return new Promise((resolve, reject) => {
    const _id = userid;
    const issuer = `orvide.com`;

    const payload = {
      sub: _id,
      iat: Date.now(),
      iss: issuer,
      type: rt
    };

    const options = {
      expiresIn: `30d`,
      algorithm: `RS256`,
    };

    jwt.sign(payload, PRIV_KEY, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      console.log(token);
      resolve(token)
    });
  });
}


function verifyRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, PRIV_KEY, (err,payload) => {
      if (err) return reject(createError.Unauthorized())
      resolve(payload)
    })
  })
}

module.exports = {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken}

