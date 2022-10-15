'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					firstName: 'John',
					lastName: 'Bob',
					email: 'demo@user.io',
					username: 'Demo-lition',
					hashedPassword: bcrypt.hashSync('password'),
				},
				{
					firstName: 'Bob',
					lastName: 'Dole',
					email: 'user1@user.io',
					username: 'FakeUser1',
					hashedPassword: bcrypt.hashSync('password2'),
				},
				{
					firstName: 'Capt',
					lastName: 'Tom',
					email: 'user2@user.io',
					username: 'FakeUser2',
					hashedPassword: bcrypt.hashSync('password3'),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			'Users',
			{
				username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] },
			},
			{}
		);
	},
};
