'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Andr",
        email: "1@1",
        password: await bcrypt.hash("1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bob",
        email: "user1@user.ru",
        password: await bcrypt.hash("1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Levi",
        email: "user2@user.ru",
        password: await bcrypt.hash("1", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
