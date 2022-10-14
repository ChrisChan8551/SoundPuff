const express = require('express');
const { session, route } = require('./session.js');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');

const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');
const { request } = require('express');

const router = express.Router();

//Edit a Song
router.put('/:songId', requireAuth, async (req, res, next) => {
	const { title, description, url, imageUrl } = req.body;
	const { songId } = req.params;
	const updateSong = await Song.findByPk(songId);

	if (!updateSong) {
		res.status(404);
		return res.json({ message: "Song couldn't be found", statusCode: 404 });
	}

	if (!title || !url) {
		return res.status(400).json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				title: 'Song title is required',
				url: 'Audio is required',
			},
		});
	}

	if (updateSong.userId === req.user.id) {
		updateSong.update({
			title,
			description,
			url,
			imageUrl: imageUrl,
		});
		return res.json(updateSong);
	} else {
		return res.json({
			message: 'A song can only be updated by the song owner',
		});
	}
});

// Get all Songs by Current User

router.get('/current', requireAuth, async (req, res) => {
	const userId = req.user.id;
	console.log(userId);
	const customersongs = await Song.findAll({ where: { userId: userId } });
	res.status(200).json({ Songs: customersongs });
});

// Create a Song Based on Album id

router.post('/', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const { title, description, url, imageUrl, albumId } = req.body;
	console.log(req.body);
	const album = await Album.findByPk(albumId);

	if ((albumId === null) || album) {
		const newSong = await Song.create({
			userId,
			albumId,
			title,
			description,
			url,
			imageUrl,
		});
		res.status(200).json(newSong);
	} else {

		return res.status(404).json({
			message: "Album couldn't be found",
			statusCode: 404,
		});
	}
});

//Delete a song
router.delete('/:songId', requireAuth, async (req, res) => {
	const { songId } = req.params;
	const findSong = await Song.findByPk(songId);

	if (!findSong) {
		res.status(404);
		return res.json({ message: "Song couldn't be found", statusCode: 404 });
	}
	if (findSong.userId === req.user.id) {
		await findSong.destroy();
		return res.json({ message: 'Successfully deleted', statusCode: 200 });
	} else {
		return res.json({
			message: 'Only the owner of the song is authorized to delete',
		});
	}
});

// Get a Song By Id
router.get('/:songId', async (req, res, next) => {
	const { songId } = req.params;
	console.log('********************************');
	console.log(songId);
	const song = await Song.findOne({
		where: { id: songId },
		include: [
			{ model: Album, attributes: ['id', 'title', 'imageUrl'] },
			{ model: User, attributes: ['id', 'username', 'imageUrl'] },
		],
	});
	// console.log('********************************');
	// console.log(song);
	if (!song) {
		return res.status(404).json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}

	return res.json(song);
});

// Get all songs
router.get('/', async (req, res) => {
	const songs = await Song.findAll({
		include: {
			model: User,
			attributes: ['id', 'username', 'imageUrl'],
		},
	});
	res.json({ Songs: songs });
});

module.exports = router;
