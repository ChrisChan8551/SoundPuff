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
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			playlistId: { type: DataTypes.INTEGER },
			songId: { type: DataTypes.INTEGER },
		},
		{
			sequelize,
			modelName: 'PlaylistSong',
		}
	);
	return PlaylistSong;
};
