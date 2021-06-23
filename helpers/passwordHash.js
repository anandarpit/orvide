const crypto = require('crypto')
module.exports = {
    validPassword: (password, hash, salt) => {
        var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return hash === hashVerify;
    },
    genPassword: (password) => {
        var salt = crypto.randomBytes(32).toString('hex');
        var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

        return {
            salt: salt,
            hash: genHash
        };
    },
    testing: () => {
        return "hello";
    }
}