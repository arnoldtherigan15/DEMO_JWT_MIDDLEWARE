'use strict';
const bcrypt = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'John@hacktiv8.com',
      password: bcrypt.hashPassword('secret'),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Jane Doe',
      email: 'Jane@hacktiv8.com',
      password: bcrypt.hashPassword('secret'),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', null, {})
  }
};
