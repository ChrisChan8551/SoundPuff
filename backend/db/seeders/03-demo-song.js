'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Songs';
   await queryInterface.bulkInsert(options, [
    {
      userId: 1,
      albumId: 1,
      title: 'Swipe Left Swipe Right',
      description: 'Are you the one',
      url: 'audio url',
      previewImage: 'image url'
    },
    {
      userId: 1,
      albumId: 1,
      title: 'Coding to the Edge',
      description: 'Getting Hexed',
      url: 'audio url',
      previewImage: 'image url'
    },
    {
      userId: 2,
      albumId: 2,
      title: 'Sleeping on my Keyboard',
      description: 'Keys imprinted on my Face',
      url: 'audio url',
      previewImage: 'image url'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs';
    await queryInterface.bulkDelete(options, null, {});
  }
};
