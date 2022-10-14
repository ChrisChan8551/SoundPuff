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

// Get details of a Playlist from an id
router.get('/:playlistId', async (req, res) => {
  const { playlistId } = req.params;
  const onePlaylist = await Playlist.findOne({
      where: { id: playlistId},
      include: [{ model: Song, through: {
          attributes: []}
      }]
  });

  if(!onePlaylist){
    return res.status(404).json({
          "message": "Playlist couldn't be found",
          "statusCode": 404
      });
  }

  return res.json(onePlaylist);
});

// Add a Song to a Playlist based on the Playlists's id
router.post('/:playlistId', requireAuth, async (req, res) => {
	const { songId } = req.body;
	const { playlistId } = req.params;
	const song = await Song.findByPk(songId);
	const onePlaylist = await Playlist.findByPk(playlistId);

	if (!song) {
		return res
			.status(404)
			.json({ message: "Song couldn't be found", statusCode: 404 });
	}
	if (!onePlaylist) {
		return res
			.status(404)
			.json({ message: "Playlist couldn't be found", statusCode: 404 });
	}

	if (onePlaylist.userId === req.user.id) {
		await onePlaylist.addSong(song);

		const newEntry = await PlaylistSong.findOne({
			where: { songId },
			order: [['createdAt', 'DESC']],
			attributes: ['id', 'playlistId', 'songId'],
		});

		return res.status(200).json(newEntry);
	} else {
		return res.json({
			message:
				'You can only add a song to a playlist if you are the playlist owner',
		});
	}
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
		imageUrl: imageUrl,
	});

	return res.status(201).json(newPlaylist);
});

module.exports = router;
