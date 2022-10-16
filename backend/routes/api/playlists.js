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

//Delete a song from a Playlist
router.delete('/:playlistId/songs/:songId', requireAuth, async (req, res) => {
	const { playlistId, songId } = req.params;
	const playlistsong = await PlaylistSong.findOne({
		where: { songId, playlistId },
	});
	if(playlistsong) {
		await playlistsong.destroy()
		return res.json({ message: 'Successfully deleted', statusCode: 200 });
	} else {
		return res.status(404)
			.json({ message: "Song couldn't be found", statusCode: 404 });
	}
});

//Delete A Playlist
router.delete('/:playlistId', requireAuth, async (req, res) => {
	const { playlistId } = req.params;
	const playlist = await Playlist.findByPk(playlistId);

	if (!playlist) {
		return res
			.status(404)
			.json({ message: "Playlist couldn't be found", statusCode: 404 });
	}

	if (playlist.userId === req.user.id) {
		await playlist.destroy();
		return res.json({ message: 'Successfully deleted', statusCode: 200 });
	} else {
		return res.json({
			message: 'A playlist can only be deleted by the playlist owner',
		});
	}
});

//Get all playlists by current user
router.get('/current', requireAuth, async (req, res) => {
	const id = req.user.id;
	const playlists = await Playlist.findAll({ where: { userId: id } });
	return res.status(200).json({ Playlists: playlists });
});

//Edit playlist by Id
router.put('/:playlistId', requireAuth, async (req, res) => {
	const { playlistId } = req.params;
	const { name, imageUrl } = req.body;
	const updatePlaylist = await Playlist.findByPk(playlistId);

	if (!updatePlaylist) {
		return res
			.status(404)
			.json({ message: "Playlist couldn't be found", statusCode: 404 });
	}
	if (!name) {
		return res.status(400).json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				title: 'Playlist name is required',
			},
		});
	}

	if (updatePlaylist.userId === req.user.id) {
		updatePlaylist.update({
			name,
			previewImage: imageUrl,
		});
		return res.json(updatePlaylist);
	} else {
		return res.json({
			message: 'A playlist can only be edited by the playlist owner',
		});
	}
});

// Add a Song to a Playlist based on the Playlists's id
router.post('/:playlistId/songs', requireAuth, async (req, res) => {
	const { songId } = req.body;
	const { playlistId } = req.params;
	const song = await Song.findByPk(songId);
	const playlist = await Playlist.findByPk(playlistId);

	if (!song) {
		return res
			.status(404)
			.json({ message: "Song couldn't be found", statusCode: 404 });
	}
	if (!playlist) {
		return res
			.status(404)
			.json({ message: "Playlist couldn't be found", statusCode: 404 });
	}

	if (playlist.userId === req.user.id) {
		await playlist.addSong(song);

		const newSong = await PlaylistSong.findOne({
			where: { songId },
			order: [['createdAt', 'DESC']],
			attributes: ['id', 'playlistId', 'songId'],
		});

		return res.status(200).json(newSong);
	} else {
		return res.json({
			message:
				'You can only add a song to a playlist if you are the playlist owner',
		});
	}
});

// Get details of a Playlist from an id
router.get('/:playlistId', async (req, res, next) => {
	const { playlistId } = req.params;
	const playlist = await Playlist.findOne({
		where: { id: playlistId },
		include: [
			{
				model: Song,
				through: {
					attributes: [],
				},
			},
		],
	});

	if (!playlist) {
		return res.status(404).json({
			message: "Playlist couldn't be found",
			statusCode: 404,
		});
	}

	return res.json(playlist);
});

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
		previewImage: imageUrl,
	});

	return res.status(201).json(newPlaylist);
});

module.exports = router;
