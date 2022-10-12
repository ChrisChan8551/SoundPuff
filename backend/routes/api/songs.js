const express = require('express');
const { session } = require('./session.js');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');

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

router.get('/current', requireAuth, async (req, res) => {
	const userId = req.user.id;
	console.log(userId);
	const customersongs = await Song.findAll({ where: { userId: userId } });
	res.status(200).json({ Songs: customersongs });
});

// Get a Song By Id
router.get('/:songId', async (req, res) => {
	const id = req.params.songId;
	const song = await Song.findAll({
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

	if (!id === null) {
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

router.delete('/:songId', requireAuth, async (req, res) => {
const { songId } = req.params;
    const findSong = await Song.findByPk(songId);

    if(!findSong){
        res.status(404);
        return res.json({ "message": "Song couldn't be found", "statusCode": 404 });
    }
    if(findSong.userId === req.user.id){
    await findSong.destroy();
    return res.json({ "message": "Successfully deleted", "statusCode": 200 });
    } else {
        return res.json({"message": "Only the owner of the song is authorized to delete"});
    }
});

module.exports = router;
