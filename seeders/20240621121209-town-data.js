"use strict";

const fs = require("fs");
const path = require("path");
const { townDetails } = require("../utils/seed");
const { Town } = require("../models");

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

    const fileName = path.resolve(__dirname, "../data/_cities.json");

    const townData = JSON.parse(fs.readFileSync(fileName, "utf8"));

    const townDataResult = townDetails(townData);

    const existingTownCount = await Town.count();

    try {
      if (existingTownCount === 0) {
        await queryInterface.bulkInsert("Towns", townDataResult, {});
        console.log("Towns seeded successfully");
      } else {
        console.log("Towns already seeded...SKIP");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("Towns", null, {});
  },
};
