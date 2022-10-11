'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Playlist extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
		// 	Playlist.hasMany(models.User, { foreignKey: 'id' });
		// 	Playlist.belongsTo(models.PlaylistSong, { foreignKey: 'playlistId' });
		}
	}
	Playlist.init(
		{
			userId: { type: DataTypes.INTEGER },
			name: { type: DataTypes.STRING },
			imageUrl: { type: DataTypes.STRING },
		},
		{
			sequelize,
			modelName: 'Playlist',
		}
	);
	return Playlist;
};
