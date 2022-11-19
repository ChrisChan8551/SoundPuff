// backend/routes/api/users.js
const express = require('express');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');

const router = express.Router();

const validateSignup = [
	check('email')
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage('Please provide a valid email.'),
	check('username')
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage('Please provide a username with at least 4 characters.'),
	check('username').not().isEmail().withMessage('Username cannot be an email.'),
	check('password')
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage('Password must be 6 characters or more.'),
	check('firstName')
		.matches(/^[A-Za-z\s]+$/)
		.withMessage('Name must be alphabetic.')
		.exists({ checkFalsy: true })
		.withMessage('Must enter a first name.'),
	check('lastName')
		.matches(/^[A-Za-z\s]+$/)
		.withMessage('Name must be alphabetic.')
		.exists({ checkFalsy: true })
		.withMessage('Must enter a last name.'),

	handleValidationErrors,
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
	const { firstName, lastName, email, username, password } = req.body;
	const verify = await User.findOne({ where: { email } });
	if (verify) {
		return res.status(403).json({
			message: 'User already exists',
			statusCode: 403,
			errors: {
				email: 'User with that email already exists',
			},
		});
	}

	const user = await User.signup({
		firstName,
		lastName,
		email,
		username,
		password,
	});

	const token = await setTokenCookie(res, user);

	if (token) {
		user.dataValues.token = token;
	} else {
		user.dataValues.token = '';
	}

	return res.json(user);
});

module.exports = router;
