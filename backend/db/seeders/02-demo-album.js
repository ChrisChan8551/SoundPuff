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
				title: 'Step by Step',
				description: 'feat Audrey Wheeler',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/step_by_step.jpg',
			},
			{
				userId: 2,
				title: 'Merry Christmas',
				description: 'Mariah Carey',
				previewImage:
					'https://mybucket8551.s3.amazonaws.com/songs/MC-Christmas.jpg',
			},
			{
				userId: 3,
				title: 'Thank You Next',
				description: 'thank you, next',
				previewImage:
					'https://mybucket8551.s3.amazonaws.com/songs/Thank_U%2C_Next_album_cover.png',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Albums';
		await queryInterface.bulkDelete(options);
	},
};
