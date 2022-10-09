const express = require('express');
const {session} = require('./session.js')

const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');

const router = express.Router();

 // Get all Songs by Current User

 router.get('/current', async (req, res) => {
  const userId = req.user.id
  const customersongs = await Song.findAll({where: {userId: userId}})
	res.json(customersongs);
});

// Get songs
router.get('/', async (req, res) => {
	const songs = await Song.findAll();
	res.json(songs);
});

// Create a Song Based on Album id

router.post('/', async (req, res) => {
	const { title, description, url, imageUrl, albumId } = req.body;
	console.log(albumId);
  const id = await Album.findOne({
    where: { id: albumId },
  });

  if (albumId === null) {
		let newSong = await Song.create({title,description,url,imageUrl,albumId});
		return res.json(newSong);
	}

  if(id === null) {
    return res.status(404).json({
      "message": "Album couldn't be found",
      "statusCode": 404
    })
  }

  if(id !== null) {
    let newSong = await Song.create({title,description,url,imageUrl,albumId});
		return res.json(newSong);
  }



});

module.exports = router;
