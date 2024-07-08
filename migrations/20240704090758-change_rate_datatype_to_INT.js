"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Assessment_Items", "rate", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Assessment_Items", "rate", {
      type: Sequelize.DECIMAL(12, 4),
    });
  },
};
