'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Songs', [
    {
      userId: 1,
      albumId: 1,
      title: 'Swipe Left Swipe Right',
      description: 'Are you the one',
      url: 'audio url',
      imageUrl: 'image url'
    },
    {
      userId: 1,
      albumId: 1,
      title: 'Coding to the Edge',
      description: 'Getting Hexed',
      url: 'audio url',
      imageUrl: 'image url'
    },
    {
      userId: 2,
      albumId: 2,
      title: 'Sleeping on my Keyboard',
      description: 'Keys imprinted on my Face',
      url: 'audio url',
      imageUrl: 'image url'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
