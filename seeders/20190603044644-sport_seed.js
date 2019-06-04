'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sports', [
      {
        name: 'weightlifting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'gymnastics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'athletics',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'rowing',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'taekwondo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'handball',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sports', null, {})
  }
};
