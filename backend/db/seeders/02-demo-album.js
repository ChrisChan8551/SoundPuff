'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Albums', [
    {
      userId: 1,
      title: 'Appify',
      description: 'Coderama',
      previewImage: 'image url'
    },
    {
      userId: 2,
      title: 'JavaMania',
      description: 'Java On!',
      previewImage: 'image url'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
