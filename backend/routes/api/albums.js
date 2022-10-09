const express = require('express');
const { session } = require('./session.js');
const {User,Song,Comment,Playlist,Album,PlaylistSong} = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
	const { title, description, imageUrl } = req.body;
	const newAlbum = await Album.create({ title, description, imageUrl });
	return res.json(newAlbum);
});

router.get('/', async (req, res) => {
	const Albums = await Album.findAll();
	return res.json({ Albums });
});

router.get('/current', async (req, res) => {
	return res.json(currentUser)
});

module.exports = router;
