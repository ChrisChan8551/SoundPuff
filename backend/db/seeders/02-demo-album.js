'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = 'Albums';
		await queryInterface.bulkInsert(options, [
			{
				userId: 1,
				title: 'Appify',
				description: 'Coderama',
				previewImage:
					'https://i1.sndcdn.com/avatars-anQ0XSGrnMQw977z-jbQQ7g-t200x200.jpg',
			},
			{
				userId: 2,
				title: 'JavaMania',
				description: 'Java On!',
				previewImage:
					'https://i1.sndcdn.com/avatars-000627024129-d2i40t-t500x500.jpg',
			},
			{
				userId: 3,
				title: 'Appy Python',
				description: 'Syntax at a Time',
				previewImage:
					'https://i1.sndcdn.com/artworks-4W6C9Q2rIvdk-0-t500x500.jpg',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Albums';
		await queryInterface.bulkDelete(options);
	},
};
