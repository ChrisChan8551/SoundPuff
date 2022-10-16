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

//Get all songs of an Artist by Id
router.get('/:userId/songs', requireAuth, async (req, res) => {
	const { userId } = req.params;

	const customersongs = await Song.findAll({ where: { userId: userId } });
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
router.get('/:userId', requireAuth, async (req, res) => {
	const { userId } = req.params;
	const user = await User.scope('artistDetails').findOne({
		where: { id: userId },
		include: [{ model: Album }, { model: Song, attributes: ['previewImage'] }],
	});

	if (!user) {
		res.status(404).json({
			message: "Artist couldn't be found",
			statusCode: 404,
		});
	}

	if (user.dataValues.Albums) {
		user.dataValues.totalAlbums = user.dataValues.Albums.length;
	} else {
		user.dataValues.totalAlbums = 0;
	}
	delete user.dataValues.Albums;
	if (user.dataValues.Songs) {
		user.dataValues.totalSongs = user.dataValues.Songs.length;
	} else {
		user.dataValues.totalSongs = 0;
	}
	delete user.dataValues.Songs;

	return res.status(200).json(user);
});

//Get All Playlists By Artist Id
router.get('/:userId/playlists', async (req, res) => {
	const { userId } = req.params;
	const artist = await User.findByPk(userId);

	if (!artist) {
		return res.status(404).json({
			message: "Artist couldn't be found",
			statusCode: 404,
		});
	}
	const playlist = await Playlist.findAll({
		where: {
			userId: userId,
		},
	});
	return res.json({ Playlists: playlist });
});

module.exports = router;
