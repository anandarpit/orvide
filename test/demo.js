// const createError = require(`http-errors`);
const crypto = require('crypto')

randomValueHex = (len) => {
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('base64') // convert to hexadecimal format
        .trim()
        .split('=')
        [0] //
        
  // return required number of characters
}

const val = randomValueHex(26)


console.log(val);

