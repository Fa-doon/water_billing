"use strict";

const fs = require("fs");
const path = require("path");
const { purposeDetails } = require("../utils/seed");
const { Purpose } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const fileName = path.resolve(__dirname, "../_purpose.json");

    const purposeData = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const purposeDataResult = purposeDetails(purposeData);

    const existingPurposeCount = await Purpose.count();

    try {
      if (existingPurposeCount === 0) {
        await queryInterface.bulkInsert("Purposes", purposeDataResult, {});
        console.log("Purposes successfully seeded");
      } else {
        console.log("Purposes already seeded...SKIP");
      }
    } catch (error) {
      console.log("An error occured", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Purposes", null, {});
  },
};
