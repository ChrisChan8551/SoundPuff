'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'Songs',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				userId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Users',
						key: 'id',
					},
					onDelete: 'CASCADE',
				},
				albumId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Albums',
						key: 'id',
					},
					defaultValue: null,
					onDelete: 'CASCADE',
				},
				title: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				description: {
					type: Sequelize.STRING,
				},
				url: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				previewImage: {
					type: Sequelize.STRING,
					defaultValue: 'image url',
				},
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = 'Songs';
		await queryInterface.dropTable(options);
	},
};
