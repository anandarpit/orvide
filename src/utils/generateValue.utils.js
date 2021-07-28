// const createError = require(`http-errors`);
const crypto = require("crypto");

exports.randomValueHex = async (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};
