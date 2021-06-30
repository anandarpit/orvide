const {issueToken, verifyToken}= require('./token')

const token = issueToken("Arpit")
console.log(token)

const value = verifyToken(token)
console.log(value);