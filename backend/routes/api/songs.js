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

// Get all Songs by Current User

router.get('/current', requireAuth, async (req, res) => {
	const userId = req.user.id;
	console.log(userId);
	const customersongs = await Song.findAll({ where: { userId: userId } });
	res.status(200).json({ Songs: customersongs });
});

// Get a Song By Id
router.get('/:songId', async (req, res) => {
	const id = req.params.songId;
	const song = await Song.findOne({
		where: { id },
		include: [
			{ model: Album, attributes: ['id', 'title', 'imageUrl'] },
			{ model: User, attributes: ['id', 'username', 'imageUrl'] },
		],
	});

	if (!song) {
		return res.status(404).json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
	}
	return res.json(song);
});

// Get songs
router.get('/', async (req, res) => {
	const songs = await Song.findAll({
		include: {
			model: User,
			attributes: ['id', 'username', 'imageUrl'],
		},
	});
	res.json({ Songs: songs });
});

// Create a Song Based on Album id

router.post('/', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const { title, description, url, imageUrl, albumId } = req.body;
	const album = await Album.findByPk(albumId)

	if(!album){
		res.status(404);
		return res.json({
				"message": "Album couldn't be found",
				"statusCode": 404
		});
}

	if(!title || !url) {
		res.status(400);
		return res.json({
				"message": "Validation Error",
				"statusCode": 400,
						"errors": {
								"title": "Song title is required",
								"url": "Audio is required"
						}
				});
		}
		if(album.userId === req.user.id){
			const newSong = await Song.create({
					userId,
					albumId,
					title,
					description,
					url,
					imageUrl
			});

			return res.status(201).json(newSong);
	} else {
			return res.json({"message": "A song can only be added by the album owner"});
	}
});

//Edit a Song
router.put('/:songId', requireAuth, async (req, res) => {
	const { title, description, url, imageUrl } = req.body;
	const { songId } = req.params;
	const updatedSong = await Song.findByPk(songId);

	if (!updatedSong) {
		res.status(404).json({
			message: "Song couldn't be found",
			statusCode: 404,
		});
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

	if (updatedSong.userId === req.user.id) {
		updatedSong.update({ title, description, url, imageUrl });
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

module.exports = router;
