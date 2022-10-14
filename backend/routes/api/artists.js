const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth } = require('../../utils/auth.js');
const {
	User,
	Song,
	Comment,
	Playlist,
	Album,
	PlaylistSong,
} = require('../../db/models');

//Get All Playlists By Artist Id
router.get('/:userId/playlists',
    async (req, res, next) => {
        const { userId } = req.params;
        const artist = await User.findByPk(userId);

        if(!artist){
            res.status(404);
            return res.json({
                "message": "Artist couldn't be found",
                "statusCode": 404
            });
        }
        const playlist = await Playlist.findAll({
            where: {
                userId: userId
            }
        });
        return res.json({"Playlists": playlist});
});

module.exports = router;
