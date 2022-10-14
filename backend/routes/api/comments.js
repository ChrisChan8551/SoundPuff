const express = require('express');
const { session, route } = require('./session.js');
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const { request } = require('express');
const router = express.Router();
const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');



module.exports = router;
