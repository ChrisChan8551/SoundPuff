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
const { requireAuth } = require('../../utils/auth.js');

const router = express.Router();

// Create an Album
router.post('/', requireAuth, async (req, res) => {
	const { title, description, imageUrl } = req.body;

	if (!title) {
		res.status(400).json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				title: 'Album title is required',
			},
		});
	}

	const userId = req.user.id;
	const newAlbum = await Album.create({ userId, title, description, imageUrl });
	return res.status(201).json(newAlbum);
});

//Get all Albums
router.get('/', async (req, res) => {
	const Albums = await Album.findAll();
	return res.json({ Albums: Albums });
});

// Get all Albums by Current User
router.get('/current', async (req, res) => {
	const userId = req.user.id;
	console.log(userId);
	const customeralbums = await Album.findAll({ where: { userId: userId } });
	res.json(customeralbums);
});

// router.get('/current', async (req, res) => {
// 	return res.json(currentUser)
// });

module.exports = router;
