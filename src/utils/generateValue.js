// const createError = require(`http-errors`);
const crypto = require("crypto");

exports.randomValueHex = async (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
     // return required number of characters
};

exports.randomId = async (len) => {
 
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('base64') // convert to hexadecimal format
    .trim()
    .split('=')[0] //

}
