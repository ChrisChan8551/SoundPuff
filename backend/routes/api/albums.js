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

// Delete an Album
router.delete('/:albumId',requireAuth,async (req, res) => {
				const { albumId } = req.params;
				const album = await Album.findByPk(albumId);

				if(!album){
					return res.status(404).json({ "message": "Album couldn't be found",  "statusCode": 404 });
				}
				if(album.userId === req.user.id){
						await album.destroy();
						return res.json({ "message": "Successfully deleted",  "statusCode": 200 });
				}  else {
						return res.json({"message": "An album can only be deleted by the album owner"});
				}
});


//Edit an Album
router.put('/:albumId', async (req, res, next) => {
	const { title, description, imageUrl } = req.body;
	const { albumId } = req.params;
	const updateAlbum = await Album.findByPk(albumId);

	if (!updateAlbum) {
		return res
			.status(404)
			.json({ message: "Album couldn't be found", statusCode: 404 });
	}

	if (!title) {
		return res.status(400).json({
			message: 'Validation Error',
			statusCode: 400,
			errors: {
				title: 'Album title is required',
			},
		});
	}

	updateAlbum.update({
		title,
		description,
		previewImage: imageUrl,
	});
	return res.json(updateAlbum);
});

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
	const newAlbum = await Album.create({ userId, title, description, previewImage: imageUrl });

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

	const customeralbums = await Album.findAll({ where: { userId: userId } });
	res.json(customeralbums);
});

//Get Details of an Album By Id
router.get('/:albumId', async (req, res) => {
	const { albumId } = req.params;
	const oneAlbum = await Album.findOne({
		where: { id: albumId },
		include: [
			{ model: User, attributes: ['id', 'username', 'previewImage'] },
			{ model: Song },
		],
	});

	if (!oneAlbum) {
		return res.status(404).json({
			message: "Album couldn't be found",
			statusCode: 404,
		});
	}

	return res.json(oneAlbum);
});

module.exports = router;
