const jwt = require(`jsonwebtoken`);
const createError = require(`http-errors`);
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = require("express")();
console.log(__dirname);
//This is temporary until we use Aws KMS to store the private key
const pathToPrivKey = path.join(__dirname, "key/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");


function signAccessToken(userId) {
  return new Promise((resolve, reject) => {
    const _id = userId;
    const issuer = `orvide.com`;

    const payload = {
      sub: _id,
      iat: Date.now(),
      iss: issuer,
      type: `at`,
    };

    const options = {
      expiresIn: `1h`,
      algorithm: `RS256`,
    };

    jwt.sign(payload, PRIV_KEY, options, (err, token) => {
      if (err) {
        console.log(err.message);
        return reject(
          createError(500, { code: "ISE", message: "internal server error" })
        );
      }
      return resolve(token);
    });
  });
}


module.exports = { signAccessToken};
