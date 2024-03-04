"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("roles", [
      { name: "user", createdAt: new Date(), updatedAt: new Date() },
      { name: "admin", createdAt: new Date(), updatedAt: new Date() },
    ]);
    // what is the password for all the users? "password"
    // bcrypt.hash("password", 10, (err, hash) => console.log(hash));
    await queryInterface.bulkInsert("users", [
      {
        username: "user1",
        password:
          "$2a$10$F2F3oZyfGZn8jvR5v7kU7e3K6Qf0D6JzYw3Pb3j3qZz1P1z6O5l7S",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        password:
          "$2a$10$F2F3oZyfGZn8jvR5v7kU7e3K6Qf0D6JzYw3Pb3j3qZz1P1z6O5l7S",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user3",
        password:
          "$2a$10$F2F3oZyfGZn8jvR5v7kU7e3K6Qf0D6JzYw3Pb3j3qZz1P1z6O5l7S",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user4",
        password:
          "$2a$10$F2F3oZyfGZn8jvR5v7kU7e3K6Qf0D6JzYw3Pb3j3qZz1P1z6O5l7S",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("user_roles", [
      { userId: 1, roleId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, roleId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, roleId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, roleId: 2, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
