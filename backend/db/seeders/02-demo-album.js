'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums';
   await queryInterface.bulkInsert(options, [
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
    options.tableName = 'Albums';
    await queryInterface.bulkDelete(options, null, {});
  }
};
