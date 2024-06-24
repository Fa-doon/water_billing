"use strict";

const fs = require("fs");
const path = require("path");
const { Purpose } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fileName = path.resolve(__dirname, "../data/_purpose.json");

    const purposeData = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const existingPurposeCount = await Purpose.count();

    try {
      if (existingPurposeCount === 0) {
        await queryInterface.bulkInsert("Purposes", purposeData, {});
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
    await queryInterface.bulkDelete("Purposes", null, {});
  },
};
