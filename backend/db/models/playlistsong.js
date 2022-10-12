'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PlaylistSong extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// PlaylistSong.belongsTo(models.Playlist, { foreignKey: 'id' });
			// PlaylistSong.belongsToMany(models.Song, { foreignKey: 'id' });
		}
	}
	PlaylistSong.init(
		{
			songId: { type: DataTypes.INTEGER },
			playlistId: { type: DataTypes.INTEGER },
			order: { type: DataTypes.INTEGER },
		},
		{
			sequelize,
			modelName: 'PlaylistSong',
		}
	);
	return PlaylistSong;
};
