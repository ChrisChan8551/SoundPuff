'use strict';
let options = {};

if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'PlaylistSongs',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				playlistId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Playlists',
						key: 'id',
					},
					onDelete: 'CASCADE',
				},
				songId: {
					type: Sequelize.INTEGER,
					references: {
						model: 'Songs',
						key: 'id',
					},
					onDelete: 'CASCADE',
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
			},
			options
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = 'PlaylistSongs';
		await queryInterface.dropTable(options);
	},
};
