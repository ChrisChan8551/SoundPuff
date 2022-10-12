'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Playlists', [
    {
      userId: 3,
      name: "My Playlist",
      imageUrl: "image url"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Playlists', null, {});
  }
};
