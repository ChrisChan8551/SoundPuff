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
  		Song.belongsToMany(models.Playlist, { through: models.PlaylistSong, foreignKey: 'songId' });
		}
	}
	Song.init(
		{
			albumId: {
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
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
			imageUrl: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: 'Song',
		}
	);
	return Song;
};
