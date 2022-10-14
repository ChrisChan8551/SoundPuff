const express = require("express");
const { session } = require("./session.js");
const {
  User,
  Song,
  Comment,
  Playlist,
  Album,
  PlaylistSong,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth.js");

const router = express.Router();

//Get all songs of an Artist by Id
router.get("/:userId/songs", requireAuth, async (req, res) => {
  const { userId } = req.params;

  const customersongs = await Song.findAll({ where: { userId: userId } });
  console.log('********************************')
  console.log(customersongs)
  if (!customersongs.length) {
    return res.status(404).json({
      message: "Artist couldn't be found",
      statusCode: 404,
    });
  } else {
    return res.status(200).json({ Songs: customersongs });
  }
});

//Get details of Artist by id
router.get("/:userId", requireAuth, async (req, res) => {
  const { userId } = req.params;
  //   console.log(id);
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404).json({
      message: "Artist couldn't be found",
      statusCode: 404,
    });
  } else {
    res.status(200).json({ User: user });
  }
});

module.exports = router;
