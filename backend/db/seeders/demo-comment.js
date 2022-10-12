'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Comments', [
    {
      userId: 1,
      songId: "3",
      body: "Goot"
    },
    {
      userId: 2,
      songId: "1",
      body: "No Bueno"
    },
    {
      userId: 3,
      songId: "2",
      body: "Bleh"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Comments', null, {});
  }
};
