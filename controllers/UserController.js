const User = require('../models').User
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class userController {
    static list(req, res) {
        User.findAll({
            attributes: ['name', 'email']
        })
            .then(userList => {
                res.status(200).json({ userList })
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }

    static register(req, res) {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(500).json({ err: 'name, email, password required to create user' })

        } else {
            User.create({ name, email, password })
                .then(user => {
                    if (!user) throw 'ERROR creating user'
                    res.status(201).json({ msg: 'SUCCESS created user', user: { name, email } })
                })
                .catch(err => {
                    res.status(500).json({ err })
                })
        }
    }

    static async login(req, res) {
        try {
            if (!req || !req.body) throw 'ERROR! no data received'

            const { email, password } = req.body
            if (!email || !password) throw 'ERROR! email and password required to login'

            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) throw 'invalid email/password'

            const checkPassword = bcrypt.checkPassword(password, user.password)
            if (!checkPassword) throw 'invalid email/password'

            const token = jwt.generateToken({ id: user.id, email: user.email })
            res.status(200).json({ token })

        } catch (err) {
            res.status(500).json({ err })
        }
    }
}

module.exports = userController