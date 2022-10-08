'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlaylistSong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlaylistSong.hasMany(models.Songs, { foreignKey: 'id' });
      PlaylistSong.hasMany(models.Playlist, { foreignKey: 'id' });
    }
  }
  PlaylistSong.init({
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlaylistSong',
  });
  return PlaylistSong;
};
