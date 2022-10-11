'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Comment.hasMany(models.Song, { foreignKey: 'id' });
			// Comment.hasMany(models.User, { foreignKey: 'id' });
		}
	}
	Comment.init(
		{
			songId: { type: DataTypes.INTEGER },
			userId: { type: DataTypes.INTEGER },
			body: { type: DataTypes.STRING },
		},

		{
			sequelize,
			modelName: 'Comment',
		}
	);
	return Comment;
};
