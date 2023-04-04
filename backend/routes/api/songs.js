const express = require('express');
const { session, route } = require('./session.js');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');

const { Op } = require('sequelize');

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

//Delete a song
router.delete('/:songId', requireAuth, async (req, res) => {
	const { songId } = req.params;

	const song = await Song.findByPk(songId);

	if (!song) {
		return res
			.status(404)
			.json({ message: "Song couldn't be found", statusCode: 404 });
	}
	if (song.userId === req.user.id) {
		await song.destroy();
		return res.json({ message: 'Successfully deleted', statusCode: 200 });
	} else {
		return res.json({
			message: 'Only the owner of the song is authorized to delete',
		});
	}
});

// Get all Comments by a Song's id
router.get('/:songId/comments', async (req, res) => {
	const { songId } = req.params;
	const song = await Song.findByPk(songId);
	if (!song) {
		return res
			.status(404)
			.json({ message: "Song couldn't be found", statusCode: 404 });
	}

	const allSongComments = await Comment.findAll({
		where: { songId },
		include: [
			{
				model: User,
				attributes: ['id', 'username'],
			},
		],
	});
	return res.json({ Comments: allSongComments });
});

// Create a Comment for a Song based on the Song's id
router.post('/:songId/comments', requireAuth, async (req, res) => {
	const { body } = req.body;
	const { songId } = req.params;
	const song = await Song.findByPk(songId);

	if (!song) {
		return res
			.status(404)
			.json({ message: "Song couldn't be found", statusCode: 404 });
	}

	if (!body) {
		return res.status(400).json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				body: 'Comment body text is required',
			},
		});
	}

	const newComment = await Comment.create({
		userId: req.user.id,
		songId,
		body,
	});

	return res.status(200).json(newComment);
});

//Edit a Song
router.put('/:songId', requireAuth, async (req, res, next) => {
	const { title, description, url, imageUrl, albumId } = req.body;
	const { songId } = req.params;
	const updateSong = await Song.findByPk(songId);
	if (!updateSong) {
		return res
			.status(404)
			.json({ message: "Song couldn't be found", statusCode: 404 });
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
			title: title,
			description: description,
			url: url,
			previewImage: imageUrl,
			albumId: albumId,
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
	const customersongs = await Song.findAll({ where: { userId: userId } });
	res.status(200).json({ Songs: customersongs });
});

// Create a Song Based on Album id

router.post('/', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const { title, description, url, imageUrl, albumId } = req.body;
	let album;
	if (albumId) {
		album = await Album.findByPk(albumId);
		if (!album) {
			return res.status(404).json({
				message: "Album couldn't be found",
				statusCode: 404,
			});
		}
	}

	if (!title || !url) {
		res.status(400);
		return res.json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				title: 'Song title is required',
				url: 'Audio is required',
			},
		});
	}

	const newSong = await Song.create({
		userId,
		albumId: albumId || null,
		title,
		description,
		url,
		previewImage: imageUrl,
	});
	res.status(200).json(newSong);
});

// Get a Song By Id
router.get('/:songId', async (req, res) => {
	const { songId } = req.params;

	const song = await Song.findOne({
		where: { id: songId },
		include: [
			{ model: Album, attributes: ['id', 'title', 'previewImage'] },
			{ model: User, attributes: ['id', 'username', 'previewImage'] },
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

// Get all songs
router.get('/', async (req, res) => {
	let { page, size, title, createdAt } = req.query;

	if (!page && !size && !title && !createdAt) {
		const songs = await Song.findAll();
		return res.json({ Songs: songs });
	}

	if (!page || isNaN(page) || page <= 0) {
		page = 1;
	}
	if (!size || isNaN(size) || size <= 0) {
		size = 20;
	}

	if (size > 20) size = 20;

	if (page > 10) size = 10;

	page = Number(page);
	size = Number(size);

	if (title) {
		const songs = await Song.findAll({
			where: {
				title: {
					[Op.like]: `%${title}%`,
				},
			},
			limit: size,
			offset: size * (page - 1),
		});

		if (songs.length) {
			return res.json({ Songs: songs, page, size });
		} else {
			return res
				.status(404)
				.json({ message: "Song couldn't be found", statusCode: 404 });
		}
	}

	if (createdAt) {
		const songs = await Song.findAll({
			where: { createdAt },
			limit: size,
			offset: size * (page - 1),
		});

		if (songs.length) {
			return res.json({ Songs: songs, page, size });
		} else {
			return res
				.status(404)
				.json({ message: "Song couldn't be found", statusCode: 404 });
		}
	} else {
		const songs = await Song.findAll({
			limit: size,
			offset: size * (page - 1),
		});
		return res.json({ Songs: songs, page, size });
	}
});

module.exports = router;
