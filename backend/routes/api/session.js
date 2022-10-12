// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
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
router.post('/', validateLogin, async (req, res, next) => {
	const { credential, password } = req.body;

	const user = await User.login({ credential, password });

	if (!user) {
		return res.status(401).json({
			"message": "Invalid credentials",
			"statusCode": 401
		});

		// return next(err);
	}

	await setTokenCookie(res, user);

	return res.json({ user });
});

router.get('/', restoreUser, (req, res) => {
	const { user } = req;
	if (user) {
		return res.json({
			user: user.toSafeObject(),
		});
	} else return res.json({});
});

// Get current user
router.get('/', (req, res) => {
	const { user } = req.params;
	res.json(user);
});

router.delete('/', (_req, res) => {
	res.clearCookie('token');
	return res.json({ message: 'success' });
});

module.exports = router;
