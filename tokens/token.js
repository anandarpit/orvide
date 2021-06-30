const base64url = require("base64url");
const crypto = require("crypto");

const signatureFunction = crypto.createSign("RSA-SHA256");
const verifyFunction = crypto.createVerify("RSA-SHA256");
const fs = require("fs");
const path = require("path");
const pathToPrivKey = path.join(__dirname, "..", "tokens/key/id_rsa_priv.pem");
const pathToPubKey = path.join(__dirname, "..", "tokens/key/id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

module.exports = {
  issueToken: (userId) => {
      try {
        const headerObj = userId;

        const headerObjString = JSON.stringify(headerObj);
        const base64UrlHeader = base64url(headerObjString);

        signatureFunction.write(base64UrlHeader);
        signatureFunction.end();

        const signatureBase64 = signatureFunction.sign(PRIV_KEY, "base64");
        const signatureBase64Url = base64url.fromBase64(signatureBase64);
        return (base64UrlHeader + `.` + signatureBase64Url);
      } catch (error) {
        return (error);
      }
  },

  verifyToken: (token) => {
      try {
        const parts = token.split(".");

        const headerInBase64UrlFormat = parts[0];
        const signatureInBase64UrlFormat = parts[1];

        const tokenSignatureBase64 = base64url.toBase64(
          signatureInBase64UrlFormat
        );

        verifyFunction.write(headerInBase64UrlFormat);
        verifyFunction.end();
        const signatureIsValid = verifyFunction.verify(
          PUB_KEY,
          tokenSignatureBase64,
          "base64"
        );

        return (signatureIsValid);
      } catch (error) {
        return (error);
      }
  },
};
