'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Atheletes', [
      {
        name: 'Andreea Aanei',
        sex: 'F',
        age: 22,
        height: 170,
        weight: 125,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nstor Abad Sanjun',
        sex: 'M',
        age: 23,
        height: 167,
        weight: 64,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Antonio Abadia Beci',
        sex: 'M',
        age: 26,
        height: 179,
        weight: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Giovanni Abagnale',
        sex: 'M',
        age: 21,
        height: 198,
        weight: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Patimat Abakarova',
        sex: 'F',
        age: 21,
        height: 165,
        weight: 49,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Luc Abalo',
        sex: 'M',
        age: 31,
        height: 182,
        weight: 86,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Atheletes', null, {})
  }
};
