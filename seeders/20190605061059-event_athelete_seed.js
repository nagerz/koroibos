'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventAtheletes', [
      {
        EventId: 1,
        AtheleteId: 1,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 2,
        AtheleteId: 2,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 3,
        AtheleteId: 2,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 4,
        AtheleteId: 2,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 5,
        AtheleteId: 2,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 6,
        AtheleteId: 2,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 7,
        AtheleteId: 2,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 8,
        AtheleteId: 3,
        medal: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 9,
        AtheleteId: 4,
        medal: 'Bronze',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 10,
        AtheleteId: 5,
        medal: 'Bronze',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        EventId: 11,
        AtheleteId: 6,
        medal: 'Silver',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EventAtheletes', null, {})
  }
};
