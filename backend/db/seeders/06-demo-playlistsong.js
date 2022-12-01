'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = 'PlaylistSongs';

		await queryInterface.bulkInsert(options, [
			{
				songId: 1,
				playlistId: 1,
			},
			{
				songId: 2,
				playlistId: 1,
			},
			{
				songId: 3,
				playlistId: 1,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'PlaylistSongs';
		await queryInterface.bulkDelete(options);
	},
};
