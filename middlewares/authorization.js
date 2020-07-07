const { Song } = require('../models')

function authorization (req, res, next) {
    let { id } = req.params
    console.log(id, '>>>>>>>>>>>> id');
    
    Song.findByPk(id)
        .then(data => {
            if(!data) throw { msg: 'Song Nof Found', status: 400 }
            else if (data.userId == req.userData.id) next()
            else throw { msg: "you're not authorize to this", status: 403 }
        })
        .catch(error => {
            let status = error.status || 500
            let msg = error.msg || 'internal server error'
            res.status(status).json({ error: msg })
        })
}

module.exports = authorization