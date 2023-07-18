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

// Create a Comment for a Song based on the Song's id
router.post('/', requireAuth, async (req, res) => {
	const { body, songId } = req.body;
	// const { songId } = req.params;
	console.log('*******BACK END CREATE COMMENT ******', 'body: ', body, songId);

	if (!songId) {
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

//Delete a comment
router.delete('/:commentId', requireAuth, async (req, res) => {
	const { commentId } = req.params;
	const deleteComment = await Comment.findByPk(commentId);

	if (!deleteComment) {
		return res
			.status(404)
			.json({ message: "Comment couldn't be found", statusCode: 404 });
	}

	if (deleteComment.userId === req.user.id) {
		await deleteComment.destroy();
		return res.json({ message: 'Successfully deleted', statusCode: 200 });
	} else {
		return res.json({
			message: 'A comment can only be deleted by the comment owner',
		});
	}
});

// Edit a Comment
router.put('/:commentId', requireAuth, async (req, res) => {
	const { body } = req.body;
	const { commentId } = req.params;
	const updateComment = await Comment.findByPk(commentId);

	if (!updateComment) {
		return res
			.status(404)
			.json({ message: "Comment couldn't be found", statusCode: 404 });
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
	if (updateComment.userId === req.user.id) {
		updateComment.update({
			body,
		});
		return res.json(updateComment);
	} else {
		return res.json({
			message: 'A comment can only be edited by the comment owner',
		});
	}
});

module.exports = router;
