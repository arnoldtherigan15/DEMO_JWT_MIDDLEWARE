var jwt = require('jsonwebtoken');
const secretKey = 'rahasia dong';

//jwt.sign('payload', 'privateKey');
function generateToken(detail) {
    return jwt.sign(detail, secretKey)
}

//jwt.verify(token, secretOrPublicKey, [options, callback])
function verifyToken(token) {
    return jwt.verify(token, secretKey)
}

module.exports = { generateToken, verifyToken }