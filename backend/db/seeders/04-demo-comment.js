'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = 'Comments';
		await queryInterface.bulkInsert(options, [
			{
				userId: 1,
				songId: '1',
				body: 'Great',
			},

			{
				userId: 3,
				songId: '3',
				body: 'Awesome',
			},
			{
				userId: 2,
				songId: '3',
				body: 'sucks!',
			},
			{
				userId: 1,
				songId: '3',
				body: 'Goot',
			},
			{
				userId: 1,
				songId: '2',
				body: 'like old times',
			},

			{
				userId: 2,
				songId: '1',
				body: 'No Bueno',
			},
			{
				userId: 1,
				songId: '1',
				body: "Don't like",
			},
			{
				userId: 2,
				songId: '1',
				body: 'Awesome!',
			},
			{
				userId: 3,
				songId: '2',
				body: 'Bleh',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Comments';
		await queryInterface.bulkDelete(options);
	},
};
