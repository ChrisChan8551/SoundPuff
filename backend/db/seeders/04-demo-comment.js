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
				body: 'Great Song! Very Groovy!',
			},

			{
				userId: 3,
				songId: '3',
				body: 'One of my Favorites',
			},
			{
				userId: 2,
				songId: '3',
				body: 'He knows really knows what women want',
			},
			{
				userId: 1,
				songId: '3',
				body: 'Every woman indeed',
			},
			{
				userId: 1,
				songId: '2',
				body: 'Very Groovy!',
			},

			{
				userId: 2,
				songId: '1',
				body: 'Not my cup of tea :(',
			},
			{
				userId: 1,
				songId: '1',
				body: "Not my favorite",
			},
			{
				userId: 2,
				songId: '1',
				body: 'One of his greatest hits!',
			},
			{
				userId: 3,
				songId: '2',
				body: "He's a legend! One of a kind!",
			},
			{
				userId: 3,
				songId: '4',
				body: "One of a kind!",
			},
			{
				userId: 2,
				songId: '4',
				body: "There's no other!",
			},
			{
				userId: 2,
				songId: '7',
				body: "The Next Mariah Carey",
			},
			{
				userId: 2,
				songId: '6',
				body: "She's the greatest!",
			},
			{
				userId: 3,
				songId: '6',
				body: "Love it!",
			},
			{
				userId: 3,
				songId: '5',
				body: "Love it!",
			},
			{
				userId: 1,
				songId: '5',
				body: "All I want is Mariah!",
			},
			{
				userId: 2,
				songId: '5',
				body: "She would be the greatest present for Christmas!",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = 'Comments';
		await queryInterface.bulkDelete(options);
	},
};
