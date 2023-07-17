const express = require('express');
const { session, route } = require('./session.js');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Op } = require('sequelize');
const { request } = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');

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

//Edit a Song
router.put(
	'/:songId',
	singleMulterUpload("audioFile"),
	requireAuth,
	asyncHandler(async (req, res, next) => {
		const { title, description, audioFile, previewImage, albumId } = req.body;
		const { songId } = req.params;
		const updateSong = await Song.findByPk(songId);

		// console.log('************EDIT SONG BACKEND**************',req.params)
		// console.log('************EDIT SONG BACKEND**************',req.body)

		// console.log('************title**************',title)
		// console.log('************description**************',description)
		// console.log('************url**************',audioFile )
		// console.log('************previewImage**************',previewImage)
		// console.log('************albumId**************',albumId)


		if (!updateSong) {
			return res
				.status(404)
				.json({ message: "Song couldn't be found", statusCode: 404 });
		}

		// if (!title || !url) {
		// 	return res.status(400).json({
		// 		message: 'Validation Error',
		// 		statusCode: 400,
		// 		errors: {
		// 			title: 'Song title is required',
		// 			url: 'Audio is required',
		// 		},
		// 	});
		// }

		let songFile = audioFile
		// console.log('*****songFile*****',req.file)

		if(req.file) {
		  songFile = await singlePublicFileUpload(req.file);
		//   console.log('*****songFile*****',songFile)
		}

		if (updateSong.userId === req.user.id) {
			updateSong.update({
				title: title,
				description: description,
				url: songFile,
				previewImage: previewImage,
				albumId: albumId,
			});
			await updateSong.save();
			return res.json(updateSong);
		} else {
			return res.json({
				message: 'A song can only be updated by the song owner',
			});
		}
	})
);

// Get all Songs by Current User

router.get('/current', requireAuth, async (req, res) => {
	const userId = req.user.id;
	const customersongs = await Song.findAll({ where: { userId: userId } });
	res.status(200).json({ Songs: customersongs });
});

// Create a Song Based on Album id

router.post(
	'/',
	singleMulterUpload('audioFile'),
	requireAuth,
	asyncHandler(async (req, res) => {
		const userId = req.user.id;
		const { title, description, previewImage, albumId } = req.body;
		// console.log('**********CREATE SONG ROUTE***************', req.body);
		// console.log(
		// 	'*****title*****',
		// 	title,
		// 	'*****description*****',
		// 	description,
		// 	'*****previewImage*****',
		// 	previewImage,
		// 	'*****albumId*****',
		// 	albumId
		// );

		if (albumId) {
			// console.log('****** IF ALBUM ID ******', albumId);
			let album = await Album.findByPk(albumId);
			if (!album) {
				return res.status(404).json({
					message: "Album couldn't be found",
					statusCode: 404,
				});
			}
		}

		// console.log('******req.file:*******', req.file);
		const audioFile = await singlePublicFileUpload(req.file);

		if (!title) {
			res.status(400);
			return res.json({
				message: 'Validation Error',
				statusCode: 400,
				errors: {
					title: 'Song title is required',
				},
			});
		}

		const newSong = await Song.create({
			userId,
			albumId,
			title,
			description,
			url: audioFile,
			previewImage,
		});
		// console.log('*******NEW SONG********', newSong);
		res.status(200).json({ newSong });
	})
);

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
		size = 3;
	}

	if (size > 3) size = 3;

	if (page > 4) size = 4;

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
