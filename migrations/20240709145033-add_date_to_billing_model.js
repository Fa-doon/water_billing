"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Billings", "assessment_item_id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addColumn("Billings", "from_date", {
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn("Billings", "to_date", {
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn("Billings", "status", {
      type: Sequelize.ENUM,
      values: ["pending", "paid"],
      defaultValue: "pending",
    });

    await queryInterface.addColumn("Billings", "amount", {
      type: Sequelize.INTEGER
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Billings", "assessment_item_id");
    await queryInterface.removeColumn("Billings", "from_date");
    await queryInterface.removeColumn("Billings", "to_date");
    await queryInterface.removeColumn("Billings", "status");
    await queryInterface.removeColumn("Billings", "amount");
  },
};
