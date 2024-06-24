"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Buildings", "town_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Towns",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Buildings", "town_id");
  },
};
