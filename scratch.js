// npx dotenv sequelize db:migrate

// npx dotenv sequelize db:seed:all

//heroku restart && heroku pg:reset DATABASE --confirm soundcloudproj && heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all

//heroku run npm run sequelize db:migrate && heroku run npm run sequelize db:seed:all

//git push heroku main

//Delete a song from a Playlist
// router.delete('/:playlistId/songs/:songId', requireAuth, async (req, res) => {
// 	const { playlistId, songId } = req.params;
// 	const playlist = await Playlist.findByPk(playlistId);
// 	const song = await Song.findByPk(songId);
// 	const playlistsong = await PlaylistSong.findOne({
// 		where: { songId, playlistId },
// 	});
// 	console.log('********************************');
// 	console.log(playlistsong);
// 	res.json();

	// if (playlistsong.userId === req.user.id) {
	// 		await playlistsong.destroy();
	// 		return res.json({ message: 'Successfully deleted', statusCode: 200 });
	// 	} else {
	// 		return res.json({
	// 			message: 'A playlist can only be deleted by the playlist owner',
	// 		});
	// 	}
	// console.log('playlistId: ', playlistId)
	// console.log('********************************')
	// console.log('songId: ', songId)

	// if (!song) {
	// 	return res.status(404).json({ message: "Song couldn't be found", statusCode: 404 });
	// }
	// if (!playlist) {
	// 	return res
	// 		.status(404)
	// 		.json({ message: "Playlist couldn't be found", statusCode: 404 });
	// }
	// 	if (playlist.userId === req.user.id) {
	// 	await playlist.destroy();
	// 	return res.json({ message: 'Successfully deleted', statusCode: 200 });
	// } else {
	// 	return res.json({
	// 		message: 'A playlist can only be deleted by the playlist owner',
	// 	});
	// }
// });
