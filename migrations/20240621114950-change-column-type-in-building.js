"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Buildings", "size", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Buildings", "size", {
      type: Sequelize.DECIMAL(10, 2),
    });
  },
};
