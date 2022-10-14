const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');

//Create a playlist
router.post('/', requireAuth, async (req, res) => {
	const { name, imageUrl } = req.body;

	if (!name) {
		return res.status(400).json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				name: 'Playlist name is required',
			},
		});
	}
	const newPlaylist = await Playlist.create({
		userId: req.user.id,
		name,
		imageUrl: imageUrl,
	});

	return res.status(201).json(newPlaylist);
});

module.exports = router;
