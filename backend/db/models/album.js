'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Album extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Album.belongsTo(models.Song, { foreignKey: 'albumId' });
			// Album.hasMany(models.User, { foreignKey: 'id' });
		}
	}
	Album.init(
		{
			userId: { type: DataTypes.INTEGER },
			title: { type: DataTypes.STRING },
			description: { type: DataTypes.STRING },
			imageUrl: { type: DataTypes.STRING },
		},
		{
			sequelize,
			modelName: 'Album',
		}
	);
	return Album;
};
