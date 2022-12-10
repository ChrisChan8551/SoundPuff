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
			Album.hasMany(models.Song, { foreignKey: 'albumId' });
			Album.belongsTo(models.User, { foreignKey: 'userId' });
		}
	}
	Album.init(
		{
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
			previewImage: {
				type: DataTypes.STRING,
				defaultValue:
					'https://cdn.pixabay.com/photo/2016/10/14/19/33/ankreuzen-1740989_960_720.png',
			},
		},
		{
			sequelize,
			modelName: 'Album',
		}
	);
	return Album;
};
