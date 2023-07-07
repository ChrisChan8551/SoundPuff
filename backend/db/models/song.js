'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Song extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Song.hasMany(models.Comment, { foreignKey: 'songId' });
			Song.belongsTo(models.Album, { foreignKey: 'albumId' });
			Song.belongsTo(models.User, { foreignKey: 'userId' });
			Song.belongsToMany(models.Playlist, {
				through: models.PlaylistSong,
				foreignKey: 'songId',
			});
		}
	}
	Song.init(
		{
			userId: {
				type: DataTypes.INTEGER,
			},
			albumId: {
				type: DataTypes.INTEGER,
				defaultValue: null,
			},

			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
			},
			url: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			previewImage: {
				type: DataTypes.STRING,
				defaultValue: 'https://mybucket8551.s3.amazonaws.com/songs/defaultSongIcon.png',
			},
		},
		{
			sequelize,
			modelName: 'Song',
		}
	);
	return Song;
};
