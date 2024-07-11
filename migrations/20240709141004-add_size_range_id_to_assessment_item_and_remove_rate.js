"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Assessment_Items", "sizerange_id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("Assessment_Items", "rate", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Assessment_Items", "sizerange_id");
    await queryInterface.removeColumn("Assessment_Items", "rate");
  },
};
