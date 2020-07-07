const { Song } = require("../models");

class SongController {
  static create(req, res) {
    let { title, artist, genre } = req.body;
    let userId = req.userData.id
    Song.create({
      title,
      artist,
      genre,
      userId
    })
      .then((data) => {
        res.status(201).json({ song: data });
      })
      .catch((err) => {
        console.log(err.errors[0].message, " >>>>>>>>>>>>>>>>>>> ERROR");
        res.status(500).json({ error: "internal server error" });
      });
  }

  static findAll(req, res) {
    let userId = req.userData.id
    Song.findAll({
      where: {
        userId
      }
    })
      .then((data) => {
        res.status(200).json({ songs: data });
      })
      .catch((err) => {
        console.log(err.errors[0].message, " >>>>>>>>>>>>>>>>>>> ERROR");
        res.status(500).json({ error: "internal server error" });
      });
  }

  static findOne(req, res) {
    let { id } = req.params;
    Song.findByPk(id)
      .then((data) => {
        if (!data) res.status(400).json({ error: "id not found" });
        else res.status(200).json({ song: data });
      })
      .catch((err) => {
        console.log(err.errors[0].message, " >>>>>>>>>>>>>>>>>>> ERROR");
        res.status(500).json({ error: "internal server error" });
      });
  }

  static delete(req, res) {
    let { id } = req.params;
    Song.findByPk(id)
      .then((data) => {
        if (!data) res.status(400).json({ error: "song not found" });
        else {
          return Song.destroy({
            where: {
              id,
            },
          });
        }
      })
      .then((data) => {
        res.status(200).json({ msg: "success delete song" });
      })
      .catch((err) => {
        console.log(err.errors[0].message, " >>>>>>>>>>>>>>>>>>> ERROR");
        res.status(500).json({ error: "internal server error" });
      });
  }
}

module.exports = SongController;
