'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tables", [
      {
        day: 1,
        time: '6:00 - 7:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 1,
        time: '7:00 - 8:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 1,
        time: '8:00 - 9:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 1,
        time: '9:00 - 9:30',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 1,
        time: '13:00 - 14:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 1,
        time: '19:00 - 20:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 1,
        time: '20:00 - 21:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        day: 1,
        time: '21:00 - 22:00',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tables", null, {});
  }
};
