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
			// Song.hasMany(models.Album, { foreignKey: 'id' });
			// Song.hasMany(models.User, { foreignKey: 'id' });
			// Song.belongsTo(models.Comment, { foreignKey: 'songId' });
			// Song.belongsTo(models.PlaylistSong, { foreignKey: 'songId' });
		}
	}
	Song.init(
		{
			albumId: { type: DataTypes.INTEGER },
			userId: { type: DataTypes.INTEGER },
			title: { type: DataTypes.STRING },
			description: { type: DataTypes.STRING },
			url: { type: DataTypes.STRING },
			imageUrl: { type: DataTypes.STRING },
		},
		{
			sequelize,
			modelName: 'Song',
		}
	);
	return Song;
};
