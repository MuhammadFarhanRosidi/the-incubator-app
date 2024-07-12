'use strict';
const fs = require('fs').promises;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let startup = JSON.parse(await fs.readFile('./data/startup.json', 'utf8'))
    startup.forEach(el => {
     delete el.id
     el.createdAt = el.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('StartUps', startup)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('StartUps', null)
  }
};
