'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teams', [
      {
        name: 'Romania',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Spain',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Italy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Azerbaijan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'France',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {})
  }
};
