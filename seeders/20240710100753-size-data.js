"use strict";

const fs = require("fs");
const path = require("path");
const { Size_range } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fileName = path.resolve(__dirname, "../data/_size.json");

    const sizeRangeData = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const existingDataCount = await Size_range.count();

    try {
      if (existingDataCount === 0) {
        await queryInterface.bulkInsert("Size_ranges", sizeRangeData, {});
        console.log("Size ranges seeded successfully");
      } else {
        console.log("Size ranges already seeded...SKIP");
      }
    } catch (error) {
      console.log("An error occured", error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Size_ranges", null, {});
  },
};
