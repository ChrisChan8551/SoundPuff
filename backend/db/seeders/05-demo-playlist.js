'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = 'Playlists';
		await queryInterface.bulkInsert(options, [
			{
				userId: 3,
				name: 'My Playlist',
				previewImage:
					'https://i1.sndcdn.com/artworks-000248333499-5htllp-t500x500.jpg',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Playlists';
		await queryInterface.bulkDelete(options);
	},
};
