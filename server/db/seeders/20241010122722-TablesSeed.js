'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Tables", [
      {
        day: 1,
        time: '7:00 - 8:00',
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
