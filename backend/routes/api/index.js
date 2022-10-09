// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')

const commentsRouter = require('./comments.js')
const playlistsRouter = require('./playlists.js')
const playlistsongsRouter = require('./playlistsongs.js')
const albumsRouter = require('./albums.js')

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// const { requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/comments', commentsRouter);
router.use('/playlists', playlistsRouter);
router.use('/playlistsongs', playlistsongsRouter);
router.use('/albums', albumsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


// router.get('/require-auth', requireAuth, (req, res) => {
// 	return res.json(req.user);
// });

// // GET /api/set-token-cookie

// router.get('/set-token-cookie', async (_req, res) => {
// 	const user = await User.findOne({
// 		where: {
// 			username: 'Demo-lition',
// 		},
// 	});
// 	setTokenCookie(res, user);
// 	return res.json({ user });
// });

// router.get('/restore-user', (req, res) => {
// 	return res.json(req.user);
// });

module.exports = router;
