'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA;
}

module.exports = {
	async up(queryInterface, Sequelize) {
		options.tableName = 'Songs';
		await queryInterface.bulkInsert(options, [
			{
				userId: 1,
				albumId: 1,
				title: 'Step by Step',
				description: 'Instrumental',
				url: 'https://mybucket8551.s3.amazonaws.com/J-L2_StepByStep/Track+01.mp3',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/step_by_step.jpg',
			},
			{
				userId: 1,
				albumId: 1,
				title: 'Groovacious',
				description: 'Instrumental',
				url: 'https://mybucket8551.s3.amazonaws.com/J-L2_StepByStep/Track+02.mp3',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/step_by_step.jpg',
			},
			{
				userId: 1,
				albumId: 1,
				title: 'Every Woman Needs It',
				description: 'Keys imprinted on my Face',
				url: 'https://mybucket8551.s3.amazonaws.com/J-L2_StepByStep/Track+03.mp3',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/step_by_step.jpg',
			},
			{
				userId: 2,
				albumId: 2,
				title: 'Oh Santa',
				description: 'Christmas',
				url: 'https://mybucket8551.s3.amazonaws.com/songs/oh_santa.mp3',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/MC-Christmas.jpg',
			},
			{
				userId: 2,
				albumId: 2,
				title: 'All I Want for Christmas is You',
				description: 'Christmas',
				url: 'https://mybucket8551.s3.amazonaws.com/songs/i_want_for_christmas_is_you.mp3',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/MC-Christmas.jpg',
			},
			{
				userId: 3,
				albumId: 3,
				title: 'Break up with your Girlfriend',
				description: "I'm bored",
				url: 'https://mybucket8551.s3.amazonaws.com/songs/break_up_with_your_girlfriend_im_bored.mp3',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/Thank_U%2C_Next_album_cover.png',
			},
			{
				userId: 3,
				albumId: 3,
				title: '7 Rings',
				description: "Thank u Next",
				url: 'https://mybucket8551.s3.amazonaws.com/songs/7_rings.mp3',
				previewImage: 'https://mybucket8551.s3.amazonaws.com/songs/Thank_U%2C_Next_album_cover.png',
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Songs';
		await queryInterface.bulkDelete(options);
	},
};
