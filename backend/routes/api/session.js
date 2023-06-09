// backend/routes/api/session.js
const express = require('express');

const {
	setTokenCookie,
	restoreUser,
	requireAuth,
} = require('../../utils/auth');
const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
	check('credential')
		.exists({ checkFalsy: true })
		.notEmpty()
		.withMessage('Please provide a valid email or username.'),
	check('password')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a password.'),
	handleValidationErrors,
];

// Log in
router.post('/', validateLogin, async (req, res) => {
	const { credential, password } = req.body;
	const user = await User.login({ credential, password });

	if (!user) {
		return res.status(401).json({
			message: 'Invalid credentials',
			statusCode: 401,
		});
	}
	const token = await setTokenCookie(res, user);

	if (token) {
		user.dataValues.token = token;
	} else {
		user.dataValues.token = '';
	}

	return res.json(user);
});

// Get Current User
router.get('/', restoreUser, async (req, res) => {
	let { user } = req;
	// console.log('USER:', user);

	if (user) {
		const token = await setTokenCookie(res, user);
		user = user.toSafeObject();
		if (token) {
			user.token = token;
		} else {
			user.token = '';
		}
		return res.json(user);
	} else return res.json(null);
});

router.delete('/', (_req, res) => {
	res.clearCookie('token');
	return res.json({ message: 'success' });
});

module.exports = router;
