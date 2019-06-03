'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: "Weightlifting Women's Super-Heavyweight",
        SportId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gymnastics Men's Individual All-Around",
        SportId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gymnastics Men's Floor Exercise",
        SportId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gymnastics Men's Parallel Bars",
        SportId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gymnastics Men's Horizontal Bar",
        SportId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gymnastics Men's Rings",
        SportId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gymnastics Men's Pommelled Horse",
        SportId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Athletics Men's 5,000 metres",
        SportId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rowing Men's Coxless Pairs",
        SportId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Taekwondo Women's Flyweight",
        SportId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Handball Men's Handball",
        SportId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {})
  }
};
