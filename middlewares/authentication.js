const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication (req, res, next) {
    let { token } = req.headers
    
    try {
        if(!token) throw { msg: 'token not found', status: 400 }
        else {
            let decoded = verifyToken(token)
            console.log(decoded, '>>>>>>>>>>>>>>>> decoded');
            
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if(!user) throw { msg: 'authentication failed', status: 401 }
            else {
                req.userData = decoded
                next()
            }
        }
    } catch (error) {
        let status = error.status || 500
        let msg = error.msg || 'internal server error'
        res.status(status).json({ error: msg })
    }
    
}

module.exports = authentication