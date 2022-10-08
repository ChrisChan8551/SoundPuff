'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsToMany(models.Comments, {foreignKey: 'songId'})
      Song.belongsToMany(models.PlaylistSong, {foreignKey: 'songId'})
      Song.hasMany(models.Album, {foreignKey: 'id'})
      Song.hasMany(models.User, {foreignKey: 'id'})
    }
  }
  Song.init({
    albumId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
