const express = require('express');
const { session } = require('./session.js');
const {User,Song,Comment,Playlist,Album,PlaylistSong} = require('../../db/models');

const router = express.Router();


router.post('/', async (req, res) => {
	console.log("********************************")
	console.log(req.body)
	const { title, description, imageUrl } = req.body;
	const userId = req.user.id
	const newAlbum = await Album.create({ userId, title, description, imageUrl });
	return res.json(newAlbum);
});


//Get all Albums
router.get('/', async (req, res) => {
	const Albums = await Album.findAll();
	return res.json({ Albums });
});

// Get all Albums by Current User
router.get('/current', async (req, res) => {
	const userId = req.user.id;
	console.log(userId);
	const customeralbums = await Album.findAll({ where: { userId: userId } });
	res.json(customeralbums);
});

// router.get('/current', async (req, res) => {
// 	return res.json(currentUser)
// });

module.exports = router;
