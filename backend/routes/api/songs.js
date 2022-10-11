const express = require('express');
const { session } = require('./session.js');

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
	const userId = req.user.id;
	console.log(userId);
	const customersongs = await Song.findAll({ where: { userId: userId } });
	res.json(customersongs);
});

// Get a Song By Id
router.get('/:songId', async (req, res) => {
	const id = req.params.songId;
	const song = await Song.findByPk(id);
	if (song !== null) {
		return res.json(song);
	}
	if (song === null) {
		return res.status(404).json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}
});

// Get songs
router.get('/', async (req, res) => {
	const songs = await Song.findAll({
		include: {
			model: User,
			attributes: ['id', 'username', 'imageUrl'],
		},
	});
	res.json(songs);
});

// Create a Song Based on Album id

router.post('/', async (req, res) => {
	const userId = req.user.id;
	const { title, description, url, imageUrl, albumId } = req.body;
	console.log(albumId);
	const id = await Album.findOne({
		where: { id: albumId },
	});

	if (albumId === null) {
		let newSong = await Song.create({
			albumId,
			userId,
			title,
			description,
			url,
			imageUrl,
		});
		return res.json(newSong);
	}

	if (id === null) {
		return res.status(404).json({
			message: "Album couldn't be found",
			statusCode: 404,
		});
	}

	if (id !== null) {
		let newSong = await Song.create({
			albumId,
			userId,
			title,
			description,
			url,
			imageUrl,
		});
		return res.json(newSong);
	}
});

module.exports = router;
